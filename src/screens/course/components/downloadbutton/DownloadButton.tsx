import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import { Models } from "openfing-core";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./DownloadButton.styles";
import { useCourse } from "src/screens/course/useCourse";

export type DownloadButtonProps = {
	className?: string;
};

type ReducerState = {
	videos?: Models.Video[] | undefined;
	video?: Models.Video | undefined;
	videoQualities?: Models.VideoQuality[] | undefined;
	videoQuality?: Models.VideoQuality | undefined;
	videoFormats?: Models.VideoFormat[] | undefined;
	videoFormat?: Models.VideoFormat | undefined;
};
type ReducerAction = {
	videos?: Models.Video[] | undefined;
	video?: string;
	videoQualities?: Models.VideoQuality[] | undefined;
	videoQuality?: string;
	videoFormats?: Models.VideoFormat[] | undefined;
	videoFormat?: string;
};
const reducer: React.Reducer<ReducerState, ReducerAction> = (prevState, action) => {
	const videos = action.videos ? action.videos : prevState.videos;

	let video = videos
		? action.video
			? videos.find(v => v.id.toString() === action.video)
			: prevState.video && videos.find(v => v.id === prevState.video!.id)
		: undefined;
	if (!video && videos && videos.length > 0) video = videos[0];

	let videoQualities = action.videoQualities ? action.videoQualities : video ? video.qualities : undefined;

	let videoQuality = videoQualities
		? action.videoQuality
			? videoQualities.find(v => v.id.toString() === action.videoQuality)
			: prevState.videoQuality && videoQualities.find(v => v.id === prevState.videoQuality!.id)
		: undefined;
	if (!videoQuality && videoQualities && videoQualities.length > 0) videoQuality = videoQualities[0];

	let videoFormats = action.videoFormats ? action.videoFormats : videoQuality ? videoQuality.formats : undefined;
	if (!videoFormats && videoQuality) videoFormats = videoQuality.formats;

	let videoFormat = videoFormats
		? action.videoFormat
			? videoFormats.find(v => v.id.toString() === action.videoFormat)
			: prevState.videoFormat && videoFormats.find(v => v.id === prevState.videoFormat!.id)
		: undefined;
	if (!videoFormat && videoFormats && videoFormats.length > 0) videoFormat = videoFormats[0];

	return {
		videos,
		video,
		videoQualities,
		videoQuality,
		videoFormats,
		videoFormat,
	};
};

export const DownloadButton: React.FunctionComponent<DownloadButtonProps> = observer<DownloadButtonProps>(props => {
	const context = useCourse();
	const referenceElementRef = useRef<HTMLButtonElement>(null);
	const [showOverlay, setShowOverlay] = useState(false);
	const [state, dispatch] = useReducer(reducer, {});

	const videos = context.courseClass && context.courseClass.videos;

	useEffect(() => {
		dispatch({ videos });
	}, [videos]);

	const handleVideoChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(e => {
		dispatch({
			video: e.target.value,
		});
	}, []);

	const handleVideoQualityChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(e => {
		dispatch({
			videoQuality: e.target.value,
		});
	}, []);

	const handleVideoFormatChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(e => {
		dispatch({
			videoFormat: e.target.value,
		});
	}, []);

	const handleSubmit = useCallback(() => {
		for (const v of [state.video, state.videoQuality, state.videoFormat]) if (!v) return;

		const a = document.createElement("a");
		a.style.display = "none";
		document.body.appendChild(a);

		a.href = state.videoFormat!.url!;

		a.setAttribute("download", a.href);
		a.setAttribute("target", "_blank");
		a.setAttribute("type", "application/octet-stream");

		a.click();

		setShowOverlay(false);

		window.URL.revokeObjectURL(a.href);
		document.body.removeChild(a);
	}, [state.video, state.videoQuality, state.videoFormat]);

	return (
		<>
			<styles.Modal
				onDismiss={() => setShowOverlay(false)}
				isVisible={showOverlay}
				onCloseAnimationFinish={() => setShowOverlay(false)}
			>
				<styles.ModalContent>
					<styles.ModalHeader>
						<styles.ModalTitle>Descargar</styles.ModalTitle>
					</styles.ModalHeader>

					<styles.FormFieldsContainer>
						{state.videos && state.videos.length > 1 && (
							<styles.FormField>
								<styles.FormFieldTitleWrapper>
									<styles.FormFieldTitle>Video</styles.FormFieldTitle>
								</styles.FormFieldTitleWrapper>
								<styles.FormFieldContent>
									<styles.FormFieldSelect
										value={state.video && state.video.id}
										onChange={handleVideoChange}
									>
										{state.videos.map(v => (
											<option key={v.id} value={v.id}>
												{v.name}
											</option>
										))}
									</styles.FormFieldSelect>
								</styles.FormFieldContent>
							</styles.FormField>
						)}

						<styles.FormField>
							<styles.FormFieldTitleWrapper>
								<styles.FormFieldTitle>Calidad</styles.FormFieldTitle>
							</styles.FormFieldTitleWrapper>

							<styles.FormFieldContent>
								{state.videoQualities && (
									<styles.FormFieldSelect
										onChange={handleVideoQualityChange}
										disabled={state.videoQualities.length <= 1}
										value={state.videoQuality && state.videoQuality.id}
									>
										{state.videoQualities.map(q => (
											<option key={q.id} value={q.id}>
												{q.height}p
											</option>
										))}
									</styles.FormFieldSelect>
								)}
							</styles.FormFieldContent>
						</styles.FormField>

						<styles.FormField>
							<styles.FormFieldTitleWrapper>
								<styles.FormFieldTitle>Formato</styles.FormFieldTitle>
							</styles.FormFieldTitleWrapper>

							<styles.FormFieldContent>
								{state.videoFormats && (
									<styles.FormFieldSelect
										onChange={handleVideoFormatChange}
										disabled={state.videoFormats.length <= 1}
										value={state.videoFormat && state.videoFormat.id}
									>
										{state.videoFormats.map(q => (
											<option key={q.id} value={q.id}>
												{q.name}
											</option>
										))}
									</styles.FormFieldSelect>
								)}
							</styles.FormFieldContent>
						</styles.FormField>
					</styles.FormFieldsContainer>

					<styles.SubmitButtonContainer>
						<styles.SubmitButton onClick={handleSubmit}>Descargar</styles.SubmitButton>
					</styles.SubmitButtonContainer>
				</styles.ModalContent>
			</styles.Modal>

			<styles.Button
				buttonRef={referenceElementRef}
				className={props.className}
				iconName="download"
				onClick={() => setShowOverlay(prevShowOverlay => !prevShowOverlay)}
			>
				Descargar
			</styles.Button>
		</>
	);
});

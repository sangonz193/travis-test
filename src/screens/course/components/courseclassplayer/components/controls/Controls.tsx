import { ControlsButton } from "../controlsbutton/ControlsButton";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./Controls.styles";
import { useCallback } from "react";
import { useCourse } from "src/screens/course/useCourse";
import { useFocus } from "src/hooks";

export type ControlsProps = {
	className?: string;

	onFocus: () => void;
	onBlur: () => void;
};

export const Controls = observer<ControlsProps>(props => {
	const courseClassController = useCourse().courseClassPlayerController;

	const handlePlayClick = useCallback(() => {
		courseClassController.setIsPlaying(!courseClassController.isPlaying);
	}, []);

	const handleFullscreenClick = useCallback(() => {
		courseClassController.setFullscreen(!courseClassController.isFullscreen);
	}, []);

	const { handleFocus, handleBlur } = useFocus({ onFocus: props.onFocus, onBlur: props.onBlur }, [
		props.onFocus,
		props.onBlur,
	]);

	return (
		<styles.Wrapper className={props.className} onFocus={handleFocus} onBlur={handleBlur}>
			<styles.BottomControlsContainer
				tabIndex={-1}
				show={courseClassController.showControls}
				onClick={e => e.preventDefault()}
				onDoubleClick={e => e.preventDefault()}
				fullscreen={courseClassController.isFullscreen}
			>
				<styles.Track />

				<styles.ButtonsContainer>
					<styles.LeftButtonsContainer>
						<ControlsButton
							iconName={courseClassController.isPlaying ? "pause" : "play"}
							onPress={handlePlayClick}
						/>

						<styles.VolumeButton />
					</styles.LeftButtonsContainer>

					<styles.RightButtonsContainer>
						<styles.PlaybackRateButton />

						<ControlsButton
							iconName={courseClassController.isFullscreen ? "exit_fullscreen" : "fullscreen"}
							onPress={handleFullscreenClick}
						/>
					</styles.RightButtonsContainer>
				</styles.ButtonsContainer>
			</styles.BottomControlsContainer>
		</styles.Wrapper>
	);
});

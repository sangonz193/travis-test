import { useCallback, useEffect, useRef } from "react";

import { LayerProvider } from "src/hooks/useLayer";
import { OverlayContainerContext } from "src/context/OverlayContainer";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseClassPlayer.styles";
import { useCourse } from "src/screens/course/useCourse";
import { usePress } from "src/components/usePress";

export type CourseClassPlayerProps = {
	className?: string;
};

export const CourseClassPlayer = observer((props: CourseClassPlayerProps) => {
	const { courseClassPlayerController: controller, courseClass } = useCourse();

	const wrapperRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isTouchRef = useRef<boolean>(false);
	const controlsIsFocusRef = useRef(false);

	const showControlsIdRef = React.useRef<string>();
	const addShowControls = () => {
		if (showControlsIdRef.current) controller.removeBlockControls(showControlsIdRef.current);

		showControlsIdRef.current = controller.setShowControls(2000);
	};

	const handleMouseMove = useCallback(() => {
		if (isTouchRef.current) return;

		addShowControls();
	}, []);

	const isDoubleClickRef = React.useRef(false);
	const removeShowControls = () =>
		!!showControlsIdRef.current && controller.removeBlockControls(showControlsIdRef.current);
	const { handleTouch, handleClick } = usePress({
		onTouch: async () => {
			console.log("touch");
			isTouchRef.current = true;

			await new Promise(resolve => setTimeout(resolve, 500));

			if (isDoubleClickRef.current || controlsIsFocusRef.current) return;

			if (!showControlsIdRef.current || !removeShowControls()) addShowControls();
		},
		onClick: async () => {
			console.log("click");
			isTouchRef.current = false;

			await new Promise(resolve => setTimeout(resolve, 300));

			if (controlsIsFocusRef.current || isDoubleClickRef.current) return;

			controller.setIsPlaying(!controller.isPlaying);
		},
	});

	React.useEffect(() => addShowControls(), [controller.loaded]);

	const handleControlsFocus = useCallback(() => {
		controlsIsFocusRef.current = true;
	}, []);

	const handleControlsBlur = useCallback(() => {
		controlsIsFocusRef.current = false;
	}, []);

	const isDoubleClickTimeout = React.useRef<number>();
	const handleDoubleClick = useCallback(() => {
		if (controlsIsFocusRef.current) return;

		isDoubleClickRef.current = true;
		if (isDoubleClickTimeout.current) clearTimeout(isDoubleClickTimeout.current);

		isDoubleClickTimeout.current = setTimeout(() => (isDoubleClickRef.current = false), 1000);
		controller.setFullscreen(!controller.isFullscreen);
	}, []);

	const handleKeyDown = useCallback<React.KeyboardEventHandler>(e => {
		const { key } = e;

		if (e.defaultPrevented) return;

		if (["ArrowLeft", "j"].includes(key)) {
			controller.setCurrentTime(controller.currentTime - 10);
			e.preventDefault();
		} else if (["ArrowRight", "l"].includes(key)) {
			controller.setCurrentTime(controller.currentTime + 10);
			e.preventDefault();
		}
		if (key === "ArrowUp") {
			controller.setVolume(Math.floor(Math.max(0, Math.min(10, controller.volume * 10 + 1))) / 10);
			e.preventDefault();
		} else if (key === "ArrowDown") {
			controller.setVolume(Math.floor(Math.max(0, Math.min(10, controller.volume * 10 - 1))) / 10);
			e.preventDefault();
		} else if ([" ", "k"].includes(key)) {
			controller.setIsPlaying(!controller.isPlaying);
			e.preventDefault();
		} else if (key === "+") {
			controller.setPlaybackRate(controller.playbackRate + 0.25);
			e.preventDefault();
		} else if (key === "-") {
			controller.setPlaybackRate(controller.playbackRate - 0.25);
			e.preventDefault();
		} else if (key === "*") {
			controller.setPlaybackRate(1);
			e.preventDefault();
		} else if (["Home", "0"].includes(key)) {
			controller.setCurrentTime(0);
			e.preventDefault();
		} else if (key === "End") {
			controller.setCurrentTime(controller.duration || 0);
			e.preventDefault();
		} else if (key === "f") {
			if (showControlsIdRef.current) removeShowControls();
			else addShowControls();

			e.preventDefault();
		} else {
			const number = Number(key);

			if (!Number.isNaN(number) && controller.duration)
				controller.setCurrentTime(number * 10 * (controller.duration / 100));
		}
	}, []);

	const overlayContainerRef = React.useRef<HTMLDivElement>(null);

	const qualities =
		courseClass && courseClass.videos && courseClass.videos.length > 0
			? courseClass.videos[0].qualities
			: undefined;

	useEffect(() => {
		controller.setVideoInstance(qualities ? videoRef.current : null);
		controller.setVideoWrapperInstance(wrapperRef.current);
	}, [qualities]);

	return (
		<OverlayContainerContext.Provider value={overlayContainerRef}>
			<LayerProvider containerRef={overlayContainerRef}>
				<styles.Wrapper
					ref={wrapperRef}
					className={props.className}
					tabIndex={0}
					fullscreen={controller.isFullscreen}
					showCursor={!controller.showControls && controller.isFullscreen}
					onTouchStart={handleTouch}
					onClick={handleClick}
					onMouseMove={handleMouseMove}
					onDoubleClick={handleDoubleClick}
					onKeyDown={handleKeyDown}
				>
					{qualities && <styles.Video videoRef={videoRef} quality={qualities[0]} />}

					{controller.loaded && <styles.Controls onFocus={handleControlsFocus} onBlur={handleControlsBlur} />}
					{(!controller.loaded || controller.waiting || controller.seeking) && <styles.Loading />}

					<styles.OverlayContainer ref={overlayContainerRef} />
				</styles.Wrapper>
			</LayerProvider>
		</OverlayContainerContext.Provider>
	);
});

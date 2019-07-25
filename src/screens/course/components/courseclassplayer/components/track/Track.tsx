import { useCallback, useEffect, useMemo, useRef } from "react";

import { LayerProps } from "src/components/layer/Layer";
import React from "react";
import { getValidPercentage } from "src/helper";
import { observer } from "mobx-react-lite";
import { secondsToString } from "openfing-core/lib/helpers";
import { styles } from "./Track.styles";
import { useCourse } from "src/screens/course/useCourse";
import { useSetState } from "src/hooks/useSetState";

export type TrackProps = {
	className?: string;
};

type TrackState = {
	trackingPointer: boolean;
	isClicking: boolean;
	positionPercentage: number;
};

export const Track = observer<TrackProps>(({ className }) => {
	const controller = useCourse().courseClassPlayerController;

	const backgroundTrackRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const [state, dispatch] = useSetState<TrackState>({
		trackingPointer: false,
		isClicking: false,
		positionPercentage: 0,
	});

	const lastPositionRef = useRef(0);
	const handleMouseEnter: React.MouseEventHandler = useCallback<React.MouseEventHandler>(e => {
		const { clientX } = e;

		if (!backgroundTrackRef.current) return;
		const { left, right } = backgroundTrackRef.current.getBoundingClientRect();
		const positionPercentage = getValidPercentage(clientX, left, right);
		lastPositionRef.current = positionPercentage;
		dispatch({ positionPercentage, trackingPointer: true });
	}, []);

	const handleTouchStart: React.TouchEventHandler = useCallback(() => {
		wrapperRef.current!.focus();
		dispatch({ trackingPointer: true, isClicking: true });
	}, []);

	const handleMouseDown: React.MouseEventHandler = useCallback(e => {
		wrapperRef.current!.focus();
		const wrapperBounds = wrapperRef.current!.getBoundingClientRect();
		const positionPercentage = getValidPercentage(e.clientX, wrapperBounds.left, wrapperBounds.right);
		lastPositionRef.current = positionPercentage;

		dispatch({
			trackingPointer: true,
			isClicking: true,
			positionPercentage,
		});
	}, []);

	const handleMouseLeave: React.MouseEventHandler = useCallback(() => {
		if (!state.isClicking) dispatch({ trackingPointer: false, isClicking: false });
	}, [state.isClicking]);

	const touchMoveRef = useRef<number | undefined>();

	const handleTouchEnd = () => {
		controller.setCurrentTime((lastPositionRef.current * controller.duration) / 100);
		dispatch({ trackingPointer: false, isClicking: false });
	};

	const handleMouseUp = () => {
		controller.setCurrentTime((lastPositionRef.current * controller.duration) / 100);
		dispatch({ trackingPointer: false, isClicking: false });
	};

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { clientX } = e;

			if (!backgroundTrackRef.current) return;
			const { left, right } = backgroundTrackRef.current.getBoundingClientRect();
			const positionPercentage = getValidPercentage(clientX, left, right);
			lastPositionRef.current = positionPercentage;
			dispatch({ positionPercentage });
		};

		const handleTouchMove = (e: TouchEvent) => {
			const { clientX } = e.touches[0];
			clearTimeout(touchMoveRef.current);

			if (!backgroundTrackRef.current) return;
			const { left, right } = backgroundTrackRef.current.getBoundingClientRect();

			const positionPercentage = getValidPercentage(clientX, left, right);
			lastPositionRef.current = positionPercentage;
			dispatch({ positionPercentage, isClicking: true });
		};

		const handleTouchCancel = () => {
			controller.setCurrentTime((lastPositionRef.current * controller.duration) / 100);
			dispatch({ trackingPointer: false, isClicking: false });
		};

		if (state.trackingPointer) {
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove);
			window.addEventListener("touchend", handleTouchEnd);
			window.addEventListener("touchcancel", handleTouchCancel);
		}

		return () => {
			window.removeEventListener("mouseup", handleMouseUp);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			window.removeEventListener("touchcancel", handleTouchCancel);
		};
	}, [state.trackingPointer, controller]);

	const currentTimePercentage = useMemo(() => (controller.currentTime * 100) / controller.duration || 0, [
		controller.currentTime,
		controller.duration,
	]);
	const progressPercentage =
		state.trackingPointer && state.isClicking ? state.positionPercentage : currentTimePercentage;

	const calculateCurrentTrackedTimeLayerPosition = React.useCallback<LayerProps["calculatePosition"]>(
		(layersWrapper, layer) => {
			const layersWrapperBounds = layersWrapper.getBoundingClientRect();
			const layerBouds = layer.getBoundingClientRect();
			const backgroundBounds = backgroundTrackRef.current && backgroundTrackRef.current.getBoundingClientRect();

			const pointerLeftRelative = backgroundBounds
				? backgroundBounds.left -
				  layersWrapperBounds.left +
				  backgroundBounds.width * (state.positionPercentage / 100) -
				  layersWrapperBounds.left
				: 0;

			const bottom = backgroundBounds ? layersWrapperBounds.height - backgroundBounds.top + 20 : 0;

			return pointerLeftRelative > layersWrapperBounds.width / 2
				? {
						bottom,
						right: Math.max(0, layersWrapperBounds.width - pointerLeftRelative - layerBouds.width / 2),
				  }
				: {
						bottom,
						left: Math.max(0, pointerLeftRelative - layerBouds.width / 2),
				  };
		},
		[state.positionPercentage]
	);

	const updateCurrentTrackedTimeLayerPositionRef = React.useRef<() => boolean>(null);

	React.useEffect(() => {
		if (state.trackingPointer && updateCurrentTrackedTimeLayerPositionRef.current)
			updateCurrentTrackedTimeLayerPositionRef.current();
	}, [state.trackingPointer, state.positionPercentage]);

	React.useEffect(() => {
		if (state.trackingPointer) controller.addBlockControls("track");
		else controller.removeBlockControls("track");
	}, [state.trackingPointer]);

	const [showTimeLeft, setShowTimeLeft] = React.useState(false);
	const handleTimeLeftClick = React.useCallback(() => setShowTimeLeft(value => !value), []);

	return (
		<styles.Wrapper ref={wrapperRef} className={className}>
			<styles.PointerTracker
				tabIndex={-1}
				onMouseEnter={handleMouseEnter}
				onTouchStart={handleTouchStart}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onTouchEnd={handleTouchEnd}
				onTouchCancel={handleTouchEnd}
			>
				<styles.BackgroundTrack ref={backgroundTrackRef}>
					<styles.BufferedTrack style={{ width: `${controller.loadedPercentage}%` }} />
					<styles.ProgressTrack style={{ width: `${progressPercentage}%` }} />

					{state.trackingPointer && controller.duration && (
						<styles.CurrentTrackedTimeLayer
							calculatePosition={calculateCurrentTrackedTimeLayerPosition}
							updatePosition={updateCurrentTrackedTimeLayerPositionRef}
						>
							<styles.CurrentTrackedTime>
								{secondsToString((state.positionPercentage * controller.duration) / 100)}
							</styles.CurrentTrackedTime>
						</styles.CurrentTrackedTimeLayer>
					)}

					<styles.ProgressIndicatorContainer
						style={{
							left: `${progressPercentage}%`,
						}}
					>
						<styles.ProgressIndicator visible={state.trackingPointer} />
					</styles.ProgressIndicatorContainer>
				</styles.BackgroundTrack>
			</styles.PointerTracker>

			<styles.TimeWrapper>
				<styles.CurrentTime>
					{!Number.isNaN(controller.currentTime) ? secondsToString(controller.currentTime) : null}
				</styles.CurrentTime>

				<styles.Duration onClick={handleTimeLeftClick}>
					{controller.duration && !Number.isNaN(controller.currentTime)
						? showTimeLeft
							? secondsToString(controller.duration - controller.currentTime)
							: secondsToString(controller.duration)
						: null}
				</styles.Duration>
			</styles.TimeWrapper>
		</styles.Wrapper>
	);
});

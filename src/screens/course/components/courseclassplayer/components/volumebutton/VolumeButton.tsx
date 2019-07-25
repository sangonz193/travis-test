import { AppStoreContext } from "src/components/AppStoreContext";
import React from "react";
import { getValidPercentage } from "src/helper";
import { observer } from "mobx-react-lite";
import { styles } from "./VolumeButton.styles";
import { useCourse } from "src/screens/course/useCourse";
import { useLayerProps } from "src/hooks/useLayerProps";

type VolumeButtonProps = {
	className?: string;
};

type VolumeButtonState = {
	trackingPointer: boolean;
	isClicking: boolean;
	positionPercentage: number;
};

export const VolumeButton: React.FunctionComponent<VolumeButtonProps> = observer(({ className }) => {
	const controller = useCourse().courseClassPlayerController;
	const { inputType } = React.useContext(AppStoreContext);
	const buttonRef = React.useRef<HTMLButtonElement>(null);
	const sliderRef = React.useRef<HTMLDivElement>(null);

	const [state, setState] = React.useState<VolumeButtonState>({
		trackingPointer: false,
		isClicking: false,
		positionPercentage: 0,
	});
	const lastPositionRef = React.useRef(0);

	const dispatch = (state: Partial<VolumeButtonState>) => setState(prevState => ({ ...prevState, ...state }));

	const handleTouchStart: React.TouchEventHandler = React.useCallback(e => {
		sliderRef.current!.focus();

		e.preventDefault();
		dispatch({ trackingPointer: true, isClicking: true });
	}, []);

	const handleMouseDown: React.MouseEventHandler = React.useCallback(e => {
		sliderRef.current!.focus();
		dispatch({ trackingPointer: true });
		const wrapperBounds = sliderRef.current!.getBoundingClientRect();

		const positionPercentage = getValidPercentage(
			e.clientY,
			wrapperBounds.top + wrapperBounds.height,
			wrapperBounds.top
		);
		lastPositionRef.current = positionPercentage;

		dispatch({
			trackingPointer: true,
			isClicking: true,
			positionPercentage,
		});
	}, []);

	const handleMouseLeave: React.MouseEventHandler = React.useCallback(() => {
		if (!state.isClicking) dispatch({ trackingPointer: false, isClicking: false });
	}, [state.isClicking]);

	const handleMouseUp = () => {
		controller.setVolume(lastPositionRef.current / 100);
		dispatch({ trackingPointer: false, isClicking: false });
	};

	const handleTouchEnd = () => {
		controller.setVolume(lastPositionRef.current / 100);
		dispatch({ trackingPointer: false, isClicking: false });
	};

	const progressPercentage =
		state.trackingPointer && state.isClicking ? state.positionPercentage : controller.volume * 100;

	const [shouldRender, layerProps, buttonProps] = useLayerProps(
		{
			behaviour: "hover",
			position: "top",
			separation: 10,
			triggerRef: buttonRef,
		},
		[progressPercentage]
	);
	const { courseClassPlayerController } = useCourse();

	const lastVolumeRef = React.useRef(courseClassPlayerController.volume); // TODO: move to controller so m key can be used

	if (courseClassPlayerController.volume && !state.trackingPointer)
		lastVolumeRef.current = courseClassPlayerController.volume;

	const handleClick = React.useCallback<React.MouseEventHandler>(
		e => {
			if (inputType !== "pointer") return;

			e.preventDefault();
			courseClassPlayerController.volume === 0
				? courseClassPlayerController.setVolume(lastVolumeRef.current || 1)
				: courseClassPlayerController.setVolume(0);
		},
		[inputType]
	);

	// TODO: mejorar BaseButton y pasar el focus al video en clic

	React.useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			const { clientY } = e;

			if (!sliderRef.current) return;
			const { top, height } = sliderRef.current.getBoundingClientRect();
			const positionPercentage = getValidPercentage(clientY, top + height, top);
			lastPositionRef.current = positionPercentage;
			controller.setVolume(lastPositionRef.current / 100);
			dispatch({ positionPercentage });
		};

		const handleTouchMove = (e: TouchEvent) => {
			const { clientY } = e.touches[0];

			e.preventDefault();

			if (!sliderRef.current) return;
			const { top, height } = sliderRef.current.getBoundingClientRect();

			const positionPercentage = getValidPercentage(clientY, top + height, top);
			lastPositionRef.current = positionPercentage;
			controller.setVolume(lastPositionRef.current / 100);
			dispatch({ positionPercentage, isClicking: true });
		};

		const handleTouchCancel = () => {
			controller.setVolume(lastPositionRef.current / 100);
			dispatch({ trackingPointer: false, isClicking: false });
		};

		if (state.trackingPointer) {
			window.addEventListener("mouseup", handleMouseUp);
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("touchmove", handleTouchMove, { passive: false });
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

	React.useEffect(() => {
		const blockControlsId = "volume-button";

		if (shouldRender) courseClassPlayerController.addBlockControls(blockControlsId);
		else courseClassPlayerController.removeBlockControls(blockControlsId);
	}, [shouldRender]);

	const { volume } = controller;

	return (
		<>
			<styles.Button {...buttonProps} onClick={handleClick} buttonRef={buttonRef} className={className}>
				<styles.Icon
					name={
						volume === 0
							? "volume_mute"
							: volume < 0.4
							? "volume_min"
							: volume < 0.75
							? "volume_medium"
							: "volume_max"
					}
				/>
			</styles.Button>

			{shouldRender && (
				<styles.Layer {...layerProps}>
					<styles.LayerWrapper>
						<styles.SliderWrapper
							ref={sliderRef}
							tabIndex={-1}
							onTouchStart={handleTouchStart}
							onMouseDown={handleMouseDown}
							onMouseLeave={handleMouseLeave}
							onMouseUp={handleMouseUp}
							onTouchEnd={handleTouchEnd}
							onTouchCancel={handleTouchEnd}
						>
							<styles.SliderTrack>
								<styles.SliderProgress
									style={{
										height: `${progressPercentage}%`,
									}}
								>
									<styles.SliderThumbContainer>
										<styles.SliderThumb />
									</styles.SliderThumbContainer>
								</styles.SliderProgress>
							</styles.SliderTrack>
						</styles.SliderWrapper>
					</styles.LayerWrapper>
				</styles.Layer>
			)}
		</>
	);
});

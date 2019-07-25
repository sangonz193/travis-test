import React, { DependencyList } from "react";

export type DragCoordinates = {
	clientX: number;
	clientY: number;
};

export type UseDragOptions = {
	onChange?: (coordinates?: DragCoordinates) => void;
};

export type UseDragOutput = {
	onMouseDown: React.MouseEventHandler;
	onTouchStart: React.TouchEventHandler;
	cancel: () => void;
	coordinates?: DragCoordinates;
};

export const useDrag = (options: UseDragOptions = {}, deps: DependencyList): UseDragOutput => {
	const [coordinates, setCoordinates] = React.useState<DragCoordinates | undefined>();
	const [trackingPointer, setTrackingPointer] = React.useState<boolean>(false);
	const trackingPointerRef = React.useRef(trackingPointer);
	trackingPointerRef.current = trackingPointer;

	const updateCoordinates = React.useCallback((coordinates: DragCoordinates | undefined) => {
		const { onChange } = options;

		if (onChange) onChange(coordinates);
		setCoordinates(coordinates);
	}, deps);

	const onMouseDown = React.useCallback<React.MouseEventHandler>(
		e => {
			const { clientX, clientY } = e;

			setTrackingPointer(true);
			updateCoordinates({ clientX, clientY });
		},
		[updateCoordinates]
	);

	const onTouchStart = React.useCallback<React.TouchEventHandler>(
		e => {
			const { clientX, clientY } = e.touches[0];

			setTrackingPointer(true);
			updateCoordinates({ clientX, clientY });
		},
		[updateCoordinates]
	);

	React.useEffect(() => {
		if (!trackingPointer) return;

		const handleMouseMove = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			updateCoordinates({ clientX, clientY });
		};

		const handleTouchMove = (e: TouchEvent) => {
			const { clientX, clientY } = e.touches[0];
			updateCoordinates({ clientX, clientY });
		};

		const stopTracking = () => {
			setTrackingPointer(false);
			setCoordinates(undefined);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("mouseup", stopTracking);
		window.addEventListener("touchend", stopTracking);
		window.addEventListener("touchcancel", stopTracking);

		return () => {
			window.removeEventListener("mouseup", stopTracking);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", stopTracking);
			window.removeEventListener("touchcancel", stopTracking);
		};
	}, [trackingPointer, updateCoordinates]);

	const cancel = React.useCallback(() => setTrackingPointer(false), []);

	return {
		onMouseDown,
		onTouchStart,
		cancel,
		coordinates,
	};
};

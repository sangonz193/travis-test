import { useEffect, useRef, useState } from "react";

import React from "react";

export const useOverlayProps = (
	referenceElementRef: React.RefObject<HTMLElement>,
	overlayContainerRef?: React.RefObject<HTMLDivElement>
): UseOverlayPropsOutput => {
	const [state, setState] = useState({ top: 0, left: 0, isVisible: false });
	let auxOverlayContainerRef = useRef<HTMLDivElement>(null);

	if (overlayContainerRef) auxOverlayContainerRef = overlayContainerRef;
	const { current: overlayContainer } = auxOverlayContainerRef;
	const { current: referenceElement } = referenceElementRef;

	useEffect(() => {
		setTimeout(() => {
			if (auxOverlayContainerRef.current !== overlayContainer || referenceElementRef.current !== referenceElement)
				setState(prevState => ({ ...prevState }));
		});
	}); // TODO: check

	useEffect(() => {
		const resizeHandler = async () => {
			await new Promise(resolve => setTimeout(resolve, 100));

			const { current: overlayContainer } = auxOverlayContainerRef;
			const { current: referenceElement } = referenceElementRef;

			if (!overlayContainer || !referenceElement) return;

			const { innerHeight, innerWidth } = window;

			const referenceElementBounds = referenceElement.getBoundingClientRect();
			const overlayContainerBounds = overlayContainer.getBoundingClientRect();

			const bottomDistance = innerHeight - referenceElementBounds.top - referenceElementBounds.height;

			const top =
				bottomDistance > overlayContainerBounds.height
					? innerHeight - bottomDistance
					: referenceElementBounds.top - overlayContainerBounds.height;

			const left =
				innerWidth - referenceElementBounds.left > overlayContainerBounds.width
					? referenceElementBounds.left
					: innerWidth - overlayContainerBounds.width - 10;

			setState({
				top,
				left,
				isVisible: true,
			});
		};

		resizeHandler();

		window.addEventListener("resize", resizeHandler);
		document.addEventListener("fullscreenchange", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
			document.removeEventListener("fullscreenchange", resizeHandler);
			setState(prevState => ({ ...prevState, isVisible: false }));
		};
	}, [auxOverlayContainerRef, auxOverlayContainerRef.current, referenceElementRef, referenceElementRef.current]);

	return {
		overlayProps: {
			...state,
			overlayContainerRef: auxOverlayContainerRef,
		},
	};
};

export type UseOverlayPropsOutput = {
	overlayProps: {
		top: number;
		left: number;
		isVisible: boolean;
		overlayContainerRef: React.RefObject<HTMLDivElement>;
	};
};

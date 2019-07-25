import { useCallback, useRef } from "react";

import React from "react";

export type UsePressProps<
	TTouchEventHandler = React.TouchEventHandler,
	TClickEventHandler = React.MouseEventHandler
> = {
	onTouch: () => void;
	onClick: () => void;
};

export type UseFocusOutput = {
	handleClick: () => void;
	handleTouch: () => void;
};

export const usePress = (props: UsePressProps): UseFocusOutput => {
	const { onClick, onTouch } = props;

	const isTouchRef = useRef(false);
	const isTouchTimeoutRef = useRef(null as any);

	const handleClick = useCallback(() => {
		if (!isTouchRef.current) onClick();
	}, []);

	const handleTouch = useCallback(() => {
		clearTimeout(isTouchTimeoutRef.current);
		isTouchRef.current = true;
		onTouch();

		isTouchTimeoutRef.current = setTimeout(() => (isTouchRef.current = false), 500);
	}, []);

	return { handleClick, handleTouch };
};

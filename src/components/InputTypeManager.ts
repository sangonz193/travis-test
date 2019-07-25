import React, { useContext, useEffect, useRef } from "react";
import { InputType } from "src/appstore/AppStore";
import { AppStoreContext } from "./AppStoreContext";

// http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
export const InputTypeManager = () => {
	const appStore = useContext(AppStoreContext);
	const [currentInput, setCurrentInput] = React.useState<InputType>("pointer");

	const isTouchTimeoutRef = useRef<number>();
	const isTouchRef = useRef<boolean>();

	useEffect(() => {
		const handleTouchStart = () => {
			clearTimeout(isTouchTimeoutRef.current);
			isTouchRef.current = true;

			setCurrentInput("touch");

			isTouchTimeoutRef.current = setTimeout(() => (isTouchRef.current = false), 500);
		};

		const handleMouseOver = () => {
			if (isTouchRef.current) return;

			setCurrentInput("pointer");
		};

		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("mouseover", handleMouseOver);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("mouseover", handleMouseOver);
		};
	}, [appStore]);

	useEffect(() => {
		appStore.setInputType(currentInput);
		document.documentElement!.classList.add(currentInput);

		return () => document.documentElement!.classList.remove(currentInput);
	}, [currentInput]);

	return null;
};

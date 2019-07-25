import { DefaultTheme, FlattenInterpolation, ThemedStyledProps } from "styled-components";
import { useContext, useEffect, useRef } from "react";

import { AppStoreContext } from "../AppStoreContext";
import { OverlayContainerContext } from "src/context/OverlayContainer";
import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { styles } from "./Modal.styles";
import { useFocus } from "src/hooks";
import { useHistory } from "src/hooks/useHistory";

export type ModalProps = {
	className?: string;
	isVisible: boolean;
	autoFocus?: boolean;
	onDismiss: () => void;
	onCloseAnimationFinish: () => void;
	contentContainerCSS?: FlattenInterpolation<ThemedStyledProps<{}, DefaultTheme>>;
};

export const Modal: React.FunctionComponent<ModalProps> = observer<ModalProps>(props => {
	const overlayContainerContext = useContext(OverlayContainerContext);
	const appStore = useContext(AppStoreContext);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const contentContainerRef = useRef<HTMLDivElement>(null);

	const propsRef = useRef(props);
	propsRef.current = props;

	const { history } = useHistory();

	useEffect(() => {
		if (props.isVisible) {
			history.push(history.location);

			return history.listen(() => {
				if (props.onDismiss) props.onDismiss();
			});
		}

		return;
	}, [props.isVisible]);

	useEffect(() => {
		if (props.isVisible)
			return () => {
				if (!propsRef.current.isVisible) propsRef.current.onCloseAnimationFinish();
			};

		return undefined;
	}, [props.isVisible, props.onCloseAnimationFinish]);

	const focusFirstElement = React.useCallback(() => {
		const focusableElementsSelector = [
			"a[href]",
			"button:not([disabled])",
			"area[href]",
			"input:not([disabled])",
			"select:not([disabled])",
			"textarea:not([disabled])",
			"iframe",
			"object",
			"embed",
			"*[tabindex]",
			"*[contenteditable]",
		].join();

		if (!contentContainerRef.current) return;

		const firstFocusableElement = contentContainerRef.current.querySelector(focusableElementsSelector);

		if (firstFocusableElement && typeof firstFocusableElement["focus"] === "function") {
			firstFocusableElement["focus"]();
			return true;
		}

		return false;
	}, []);

	useEffect(() => {
		const autoFocus = props.autoFocus !== false;

		if (props.isVisible && autoFocus) focusFirstElement();
	}, [props.isVisible]);

	let lastIsFocused = React.useRef(appStore.isFocused);
	useEffect(() => {
		if (!props.isVisible) return;

		if (!appStore.isFocused || lastIsFocused.current === appStore.isFocused) {
			lastIsFocused.current = appStore.isFocused;
			return;
		}

		lastIsFocused.current = appStore.isFocused;
		focusFirstElement();
	}, [props.isVisible, appStore.isFocused]);

	const { handleFocus, handleBlur } = useFocus(
		{
			onBlur: async () => {
				await new Promise(r => setTimeout(r(), 15));

				if (document.activeElement === wrapperRef.current) props.onDismiss();
				else if (!focusFirstElement() && contentContainerRef.current) contentContainerRef.current.focus();
			},
			onFocus: () => {},
		},
		[props.onDismiss, props.isVisible]
	);

	const handleKeyPress = React.useCallback<React.KeyboardEventHandler>(e => {
		if (e.isDefaultPrevented()) return;

		if (e.which === 27) props.onDismiss();
	}, []);

	return (
		overlayContainerContext.current &&
		ReactDOM.createPortal(
			props.isVisible && (
				<>
					<styles.HiddenButton aria-hidden />

					<styles.Wrapper
						ref={wrapperRef}
						tabIndex={-1}
						isVisible={props.isVisible}
						className={props.className}
						onKeyDown={handleKeyPress}
					>
						<styles.ContentContainer
							ref={contentContainerRef}
							tabIndex={-1}
							css={props.contentContainerCSS}
							onFocus={handleFocus}
							onBlur={handleBlur}
						>
							{props.children}
						</styles.ContentContainer>
					</styles.Wrapper>

					<styles.HiddenButton aria-hidden />
				</>
			),
			overlayContainerContext.current
		)
	);
});

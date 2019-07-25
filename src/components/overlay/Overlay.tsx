import { OverlayContainerContext } from "src/context/OverlayContainer";
import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react-lite";
import { styles } from "./Overlay.styles";
import { useContext } from "react";
import { useFocus } from "src/hooks";

export type OverlayProps = {
	className?: string;
	overlayContainerRef?: React.RefObject<HTMLDivElement>;

	top: number;
	left: number;

	isVisible: boolean;

	onDismiss: () => void;
};

export const Overlay: React.FunctionComponent<OverlayProps> = observer(props => {
	const { children, className, top, left, isVisible, overlayContainerRef } = props;

	const context = useContext(OverlayContainerContext);

	const { handleFocus, handleBlur } = useFocus(
		{
			onBlur: props.onDismiss,
			onFocus: () => {},
		},
		[props.onDismiss]
	);

	const handleKeyDown = React.useCallback<React.KeyboardEventHandler>(
		e => {
			if (e.which === 27) {
				e.preventDefault();
				props.onDismiss();
			}
		},
		[props.onDismiss]
	);

	return (
		context.current &&
		ReactDOM.createPortal(
			<styles.Wrapper
				ref={overlayContainerRef}
				className={className}
				tabIndex={-1}
				style={{ top, left, opacity: isVisible ? 1 : 0, width: 0, height: 0, pointerEvents: "auto" }}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
			>
				{children}
			</styles.Wrapper>,
			context.current
		)
	);
});

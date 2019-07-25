import React from "react";
import { styles } from "./BaseButton.styles";

export type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	buttonRef?: React.RefObject<HTMLButtonElement>;
};

export const BaseButton: React.FunctionComponent<BaseButtonProps> = props => (
	<styles.Button {...props} ref={props.buttonRef} />
);

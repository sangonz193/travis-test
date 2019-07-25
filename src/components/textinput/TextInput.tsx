import React from "react";

import { styles } from "./TextInput.styles";

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	onChangeText?: (value: string) => void;
	focusRef?: React.MutableRefObject<(() => void) | null>;
	right?: React.ReactNode;
};

export const TextInput = (props: TextInputProps) => {
	const { className, focusRef, right, onChange, onChangeText, ...rest } = props;

	const inputRef = React.useRef<HTMLInputElement>(null);
	const focusInput = React.useCallback(() => {
		if (inputRef.current) inputRef.current.focus();
	}, []);

	React.useEffect(() => {
		if (!focusRef) return;

		focusRef.current = focusInput;

		return () => {
			focusRef.current = null;
		};
	}, [focusRef]);

	const handleOnChange = React.useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		e => {
			if (onChangeText) onChangeText(e.target.value);
			if (onChange) onChange(e);
		},
		[onChangeText, onChange]
	);

	return (
		<styles.Container className={className} onClick={focusInput}>
			<styles.Input ref={inputRef} {...rest} onChange={handleOnChange} />

			{right}
		</styles.Container>
	);
};

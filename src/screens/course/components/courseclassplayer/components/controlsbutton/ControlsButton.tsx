import { IconProps } from "../../../../../../components/icon/Icon";
import React from "react";
import { styles } from "./ControlsButton.styles";
import { useCallback } from "react";

type ControlsButtonProps = {
	className?: string;

	onPress: () => void;
	iconName: IconProps["name"];
};

export const ControlsButton: React.FunctionComponent<ControlsButtonProps> = ({ className, onPress, iconName }) => {
	const handleKeyDown = useCallback<React.KeyboardEventHandler>(
		e => {
			if (![32, 13].includes(e.which)) return;

			e.preventDefault();
			onPress();
		},
		[onPress]
	);

	return (
		<styles.Button className={className} onClick={onPress} onKeyDown={handleKeyDown}>
			<styles.Icon name={iconName} />
		</styles.Button>
	);
};

import { BaseButtonProps } from "src/components/basebutton/BaseButton";
import { IconName } from "src/components/icon/Icon";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./VideoButton.styles";

export type VideoButtonProps = BaseButtonProps & {
	className?: string;
	iconName: IconName;
};

export const VideoButton: React.FunctionComponent<VideoButtonProps> = observer<VideoButtonProps>(
	({ children, iconName, ...rest }) => {
		return (
			<styles.Wrapper {...rest}>
				<styles.Icon name={iconName} />

				<styles.Title>{children}</styles.Title>
			</styles.Wrapper>
		);
	}
);

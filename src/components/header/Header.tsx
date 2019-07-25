import React from "react";
import { styles } from "./Header.styles";
import { useHistory } from "src/hooks/useHistory";

export type HeaderProps = {
	className?: string;
	title?: string | React.ReactNode | (() => React.ReactNode);
	showBackButton: boolean;
	right?: React.ReactNode;
};

export const Header: React.FunctionComponent<HeaderProps> = props => {
	const { title, showBackButton, right } = props;
	const { history } = useHistory();

	return (
		<styles.Wrapper className={props.className}>
			{showBackButton && <styles.BackButton onClick={history.goBack} />}

			{!title ? (
				undefined
			) : typeof title === "string" ? (
				<styles.Title leftPadding={!showBackButton} rightPadding={right === undefined}>
					{title}
				</styles.Title>
			) : typeof title === "function" ? (
				(title as () => {})()
			) : (
				title
			)}

			{right}
		</styles.Wrapper>
	);
};

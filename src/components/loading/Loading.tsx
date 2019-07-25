import React from "react";
import { styles } from "./Loading.styles";

export type LoadingProps = {
	className?: string;
};

export const Loading: React.FunctionComponent<LoadingProps> = ({ className }) => {
	return (
		<styles.Wrapper className={className}>
			<styles.Container>
				<styles.Loading />
			</styles.Container>
		</styles.Wrapper>
	);
};

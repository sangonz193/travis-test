import React, { useEffect, useState } from "react";

import { NavigationComponentProps } from "../../navigation/Navigator";
import { styles } from "./Home.styles";
import { useDocumentTitle } from "../../components/useDocumentTitle";

export const Home: React.FunctionComponent<NavigationComponentProps> = () => {
	const [mounted, setMounted] = useState(false);
	useDocumentTitle("Inicio - OpenFING");

	useEffect(() => setMounted(true), []);

	return (
		<styles.Wrapper>
			<styles.BackgroundContainer>
				<styles.BackgroundImage mounted={mounted} />
				<styles.BackgroundFilter />
			</styles.BackgroundContainer>

			<styles.ContentWrapper>
				<styles.TopContentContainer>
					<styles.LogoContainer>
						<styles.OpenFINGLogo />
						<styles.LogoText />
					</styles.LogoContainer>

					<styles.CaptionsWrapper>
						<styles.Caption>Estudiá a tu ritmo</styles.Caption>
						<styles.SecondCaption> Donde quieras. Cuando quieras.</styles.SecondCaption>
					</styles.CaptionsWrapper>
				</styles.TopContentContainer>
			</styles.ContentWrapper>
		</styles.Wrapper>
	);
};

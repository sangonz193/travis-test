import CCImage from "./CreativeCommons.svg";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./CreativeCommons.styles";

export type CreativeCommonsProps = {
	className?: string;
};

export const CreativeCommons = observer((props: CreativeCommonsProps) => {
	const { className } = props;

	return (
		<styles.Container className={className}>
			<styles.ImageContainer
				rel="license"
				target="_blank"
				href="http://creativecommons.org/licenses/by-nc-nd/4.0/"
			>
				<styles.Image alt="Licencia de Creative Commons" style={{ borderWidth: 0 }} src={CCImage} />
			</styles.ImageContainer>

			<styles.Text>
				Este obra está bajo una{" "}
				<styles.Link rel="license" target="_blank" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
					licencia de Creative Commons Reconocimiento-NoComercial-SinObraDerivada 4.0 Internacional
				</styles.Link>
				.
			</styles.Text>
		</styles.Container>
	);
});

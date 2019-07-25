import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./NavBar.styles";

export type NavBarProps = {
	className?: string;
};

export const NavBar: React.FunctionComponent<NavBarProps> = observer(props => {
	return (
		<styles.Wrapper className={props.className}>
			<styles.Button route="/" routeName="Home" iconName="house" exact={true} />
			<styles.Button route="/courses" routeName="Cursos" iconName="video_camera" />
			<styles.Button route="/updates" routeName="Actualizaciones" iconName="new" />
			<styles.Button route="/faqs" routeName="FAQs" iconName="help" />
		</styles.Wrapper>
	);
});

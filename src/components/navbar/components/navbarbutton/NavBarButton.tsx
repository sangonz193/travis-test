import { IconName } from "../../../icon/Icon";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./NavBarButton.styles";
import { useHistory } from "src/hooks/useHistory";
import { useMatchPath } from "../../../useMatchPath";

export type NavBarButtonProps = {
	className?: string;
	route: string;
	routeName: string;
	iconName: IconName;
	exact?: boolean;
};

export const NavBarButton: React.FunctionComponent<NavBarButtonProps> = observer((props: NavBarButtonProps) => {
	const { history } = useHistory();
	const matchPath = useMatchPath(history.location.pathname, {
		path: props.route,
		exact: props.exact,
	});

	return (
		<styles.Wrapper
			className={props.className}
			title={props.routeName}
			href={props.route}
			isActive={matchPath !== null}
		>
			<styles.Icon name={props.iconName} isActive={matchPath !== null} />
			<styles.Label isActive={matchPath !== null}>{props.routeName}</styles.Label>
		</styles.Wrapper>
	);
});

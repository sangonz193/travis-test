import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./Link.styles";
import { useCallback } from "react";
import { useHistory } from "src/hooks/useHistory";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = observer((props: LinkProps) => {
	const { history } = useHistory();
	const handleClick = useCallback<(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void>(
		e => {
			e.preventDefault();

			if (props.href) {
				if (!props.target || props.target === "_self") history.push(props.href);
				// TODO: test
				else window.open(props.href, props.target);
			}

			if (props.onClick) props.onClick(e);
		},
		[props.onClick, history]
	);

	return <styles.Link {...props} onClick={handleClick} />;
});

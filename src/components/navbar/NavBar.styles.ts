import styled, { css } from "styled-components";
import { Breakpoint, Mixins } from "../../style";
import { NavBarButton } from "./components/navbarbutton/NavBarButton";

export const styles = {
	Wrapper: styled.div`
		overflow: auto;
		flex-direction: row;

		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				flex-direction: column;
			`
		)};
	`,

	Button: styled(NavBarButton)`
		${p => css`
			flex: 1 0 ${p.theme.rowHeight}px;

			${Mixins.WiderThan(
				Breakpoint.md,
				css`
					flex-grow: 0;
				`
			)}
		`};
	`,
};

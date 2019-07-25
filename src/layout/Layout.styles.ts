import styled, { css } from "styled-components";
import { Header } from "../components/header/Header";
import { NavBar } from "../components/navbar/NavBar";
import { Breakpoint, Mixins } from "../style";

export const styles = {
	Wrapper: styled.div`
		flex: 1 1 auto;

		overflow: hidden;

		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				flex-direction: row-reverse;
			`
		)};
	`,

	ContentContainer: styled.div`
		flex: 1 1 auto;
		flex-direction: column-reverse;

		overflow: hidden;
	`,

	Header: styled(Header)`
		${p => css`
			position: relative;
			flex: 0 0 ${p.theme.baseLineHeight}px;

			box-shadow: 0 0 4px rgba(67, 52, 52, 0.2);
		`};
	`,

	NavBar: styled(NavBar)`
		${p => css`
			position: relative;
			flex: 0 0 ${p.theme.baseLineHeight}px;

			box-shadow: 0 0 4px rgba(67, 52, 52, 0.2);
		`}
	`,
};

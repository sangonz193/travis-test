import styled, { css } from "styled-components";
import { Breakpoint, Mixins } from "../../style";

export const styles = {
	Container: styled.div`
		padding: 20px;
		margin-top: auto;
		width: 100%;

		background-color: #fafafa;

		box-shadow: 0 0 5px rgba(67, 52, 52, 0.3);

		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				flex-direction: row;
				${Mixins.HSpacing(10)};
				align-items: center;
			`
		)};

		${Mixins.NarrowerThan(
			Breakpoint.md,
			css`
				${Mixins.VSpacing(10)};
			`
		)};
	`,

	ImageContainer: styled.a`
		align-self: flex-start;
	`,

	Image: styled.img`
		height: 45px;
	`,

	Text: styled.span`
		display: inline;
		flex: 0 0 auto;

		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				flex: 1 1 0;
			`
		)};
	`,

	Link: styled.a`
		display: inline;

		&,
		&:visited,
		&:active {
			color: ${p => p.theme.accentColor};
		}
	`,
};

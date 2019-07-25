import styled, { css } from "styled-components";
import { Link } from "../../../../components/link/Link";
import { Breakpoint, Mixins } from "../../../../style";
import { WiderThan } from "../../../../style/Mixins";

export const styles = {
	Wrapper: styled.div``,

	Container: styled(Link)`
		${p => css`
			flex-basis: ${p.theme.rowHeight}px;
			flex-direction: row;
			align-items: center;
			padding: 0 20px;

			color: #000;

			text-decoration: none;

			${WiderThan(
				Breakpoint.sm,
				css`
					flex-basis: ${p.theme.rowHeight * 2}px;
					padding: 20px 15px;
					border: 1px rgba(67, 52, 52, 0.2) solid;

					background-color: #fafafa;

					font-size: 18px;
				`
			)};
		`};
	`,

	Icon: styled.img`
		${p => css`
			flex: 0 0 ${p.theme.rowHeight - 10}px;
			align-self: stretch;
			margin-right: 15px;
			margin-top: 10px;
			margin-bottom: 10px;

			${WiderThan(
				Breakpoint.sm,
				css`
					flex-basis: ${p.theme.rowHeight}px;
				`
			)};
		`}
	`,

	Name: styled.span`
		flex: 1 1 100%;

		${Mixins.EllipsisText()}
	`,

	Divider: styled.span`
		flex: 0 0 1px;
		width: 90%;
		align-self: center;

		background-color: rgb(225, 225, 225);

		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				display: none;
			`
		)};
	`,
};

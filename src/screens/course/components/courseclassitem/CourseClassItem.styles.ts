import styled, { css } from "styled-components";
import { Link } from "../../../../components/link/Link";
import { Mixins } from "../../../../style";

export const styles = {
	Wrapper: styled(Link)<{ isActive: boolean }>`
		${p => css`
			flex-basis: ${p.theme.rowHeight}px;

			${p.isActive &&
				css`
					color: white;
					background-color: ${p.theme.accentColor};
				`};
		`};
	`,

	ContentContainer: styled.div<{ isActive: boolean }>`
		${p => css`
			flex: 1;
			flex-direction: row;
			align-items: center;

			${p.isActive &&
				css`
					color: white;
				`};
		`};
	`,

	Number: styled.span`
		${p => css`
			flex-basis: ${p.theme.rowHeight}px;
			align-items: center;

			font-weight: bold;
		`};
	`,

	Title: styled.span`
		${p => css`
			flex: 1 1 ${p.theme.rowHeight}px;
			align-items: center;
			padding: 0 20px 0 0;
			${Mixins.EllipsisText()}
		`};
	`,

	Divider: styled.span`
		flex: 0 0 1px;
		width: 90%;
		align-self: center;

		background-color: rgb(225, 225, 225);
	`,
};

import styled, { css } from "styled-components";
import { Link } from "../../../../components/link/Link";
import { Breakpoint, Mixins } from "../../../../style";
import { WiderThan } from "../../../../style/Mixins";

export const styles = {
	Wrapper: styled(Link)`
		${p => css`
			flex-basis: ${p.theme.rowHeight * 2}px;
			flex-direction: row;
			align-items: center;
			padding: 20px;

			color: #000;

			text-decoration: none;

			${WiderThan(
				Breakpoint.sm,
				css`
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
			flex-basis: ${p.theme.rowHeight}px;
			align-self: stretch;
			margin: 10px 15px 10px 0;
		`}
	`,

	InfoContainer: styled.div`
		position: relative;

		flex: 1 1 100%;
	`,

	InfoContainerHeader: styled.div`
		position: absolute;
		height: 0;
		overflow: visible;
		top: -10px;
		left: 0;
		right: 0;
		align-items: flex-end;
		flex-direction: row;
		margin-bottom: 10px;
	`,

	CourseName: styled.span`
		flex: 1 1 100%;
		${Mixins.EllipsisText()};

		font-size: 12px;
		font-weight: bold;
	`,

	CreatedAt: styled.span`
		font-size: 12px;
		flex: 0 0 auto;
	`,

	Title: styled.span`
		${Mixins.EllipsisText()}
	`,
};

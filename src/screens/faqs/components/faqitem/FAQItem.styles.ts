import styled from "styled-components";
import { Mixins } from "../../../../style";

export const styles = {
	Wrapper: styled.div`
		${Mixins.VSpacing(30)};
		align-items: center;
		padding: 20px 20px;
	`,

	Title: styled.span`
		font-size: 20px;
		font-weight: bold;
		text-align: center;
	`,

	Content: styled.span`
		display: inline;

		text-align: center;

		> a {
			display: inline;

			color: ${p => p.theme.accentColor};

			&:hover {
				color: ${p => p.theme.accentColor};
			}
		}
	`,

	Divider: styled.div`
		flex: 0 0 1px;
		width: 100%;

		background-color: rgb(225, 225, 225);
	`,
};

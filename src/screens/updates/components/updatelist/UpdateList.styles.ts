import styled, { css } from "styled-components";
import { Breakpoint, Mixins } from "../../../../style";
import { UpdateItem } from "../updateitem/UpdateItem";

export const styles = {
	Wrapper: styled.div`
		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				padding: 20px 0;
				${Mixins.VSpacing(20)};
			`
		)};
	`,

	UpdateItem: styled(UpdateItem)``,

	Divider: styled.span`
		flex: 0 0 1px;
		width: 90%;

		background-color: rgb(225, 225, 225);

		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				display: none;
			`
		)};
	`,
};

import styled, { css } from "styled-components";
import { Mixins } from "../../style";
import { BaseButton } from "../basebutton/BaseButton";

export const styles = {
	Wrapper: styled.div`
		flex-grow: 1;
		flex-direction: row;
	`,

	BackButton: styled(BaseButton)`
		${p => css`
			align-items: center;
			justify-content: center;

			flex: 0 0 ${p.theme.rowHeight}px;
		`};
	`,

	Title: styled("span")<{ leftPadding: boolean; rightPadding: boolean }>`
		align-items: center;
		align-self: center;
		flex: 1 1 auto;
		padding: 0 20px;
		${Mixins.EllipsisText()};
		margin-top: auto;
		margin-bottom: auto;
		line-height: normal;

		font-weight: bold;
		font-size: 18px;

		${p =>
			!p.leftPadding &&
			css`
				padding-left: 0;
			`};

		${p =>
			!p.rightPadding &&
			css`
				padding-right: 0;
			`};
	`,
};

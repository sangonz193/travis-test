import { BaseButton } from "src/components/basebutton/BaseButton";
import { Icon } from "src/components/icon/Icon";
import { Mixins } from "src/style";
import styled, { css } from "styled-components";

export const styles = {
	Wrapper: styled(BaseButton)`
		${p => css`
			flex-direction: row;
			align-items: center;
			height: ${p.theme.rowHeight}px;

			${Mixins.OnHover(css`
				background-color: rgba(0, 0, 0, 0.1);
			`)}
		`};
	`,

	Icon: styled(Icon)`
		${p => css`
			height: 100%;
			padding: 10px 0;
			fill: ${p.theme.accentColor};
		`};
	`,

	Title: styled.span`
		${p => css`
			margin-left: 10px;

			color: ${p.theme.accentColor};

			font-size: 16px;
		`};
	`,
};

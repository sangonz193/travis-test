import styled, { css } from "styled-components";

import { BaseButton } from "../../../../../../components/basebutton/BaseButton";
import { Icon } from "../../../../../../components/icon/Icon";
import { Mixins } from "../../../../../../style";
import rgba from "polished/lib/color/rgba";

export const styles = {
	Button: styled(BaseButton)`
		align-items: stretch;

		width: ${({ theme }) => theme.baseLineHeight}px;
		height: ${({ theme }) => theme.baseLineHeight}px;

		${Mixins.OnHover(css`
			background-color: ${rgba(0, 0, 0, 0.1)};
		`)}
	`,

	Icon: styled(Icon)`
		flex: 1 1 0;
		min-height: 0;
		margin: 10px;
		fill: black;
	`,
};

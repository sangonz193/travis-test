import rgba from "polished/lib/color/rgba";
import styled, { css } from "styled-components";
import { BaseButton } from "../../../../../../components/basebutton/BaseButton";
import { Mixins } from "../../../../../../style";

export const styles = {
	Button: styled(BaseButton)`
		align-items: stretch;
		justify-content: center;
		width: ${({ theme }) => theme.baseLineHeight}px;
		height: ${({ theme }) => theme.baseLineHeight}px;

		font-size: 15px;
		font-weight: bold;

		${Mixins.OnHover(css`
			background-color: ${rgba(0, 0, 0, 0.1)};
		`)}
	`,

	PlaybackRateList: styled.div`
		position: absolute;
		align-self: center;
		bottom: 0;
		background-color: white;
		box-shadow: 0 0 5px rgba(25, 25, 25, 0.3);
		max-height: 200px;
		width: 200px;

		overflow: auto;
	`,

	PlaybackRateItem: styled(BaseButton)<{ active: boolean }>`
		padding: 0 15px;
		justify-content: center;
		height: ${({ theme }) => theme.baseLineHeight}px;

		${({ active, theme }) => css`
			${Mixins.OnHover(css`
				background-color: ${rgba(0, 0, 0, 0.1)};
			`)}

			${active &&
				css`
					&,
					&:focus {
						background-color: ${theme.accentColor};
						color: white;

						${Mixins.OnHover(css`
							background-color: ${theme.accentColor};
							color: white;
						`)}
					}

					${Mixins.OnHover(css`
						background-color: ${theme.accentColor};
						color: white;
					`)}
				`}
		`}
	`,
};

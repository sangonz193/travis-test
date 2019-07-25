import styled, { DefaultTheme, FlattenInterpolation, ThemedStyledProps, css } from "styled-components";

export const styles = {
	Wrapper: styled.div<{ isVisible: boolean }>`
		${p => css`
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;

			background-color: transparent;

			opacity: 0;
			pointer-events: none;
			${p.isVisible &&
				css`
					background-color: rgba(0, 0, 0, 0.2);
					opacity: 1;
					pointer-events: auto;
				`};
		`}
	`,

	ContentContainer: styled.div<{ css?: FlattenInterpolation<ThemedStyledProps<{}, DefaultTheme>> }>`
		${p =>
			css`
				align-self: center;
				margin: auto 0;
				border-radius: 5px;
				min-height: 50px;
				max-height: 100%;
				min-width: 50px;
				max-width: 100%;

				background-color: white;

				${p.css};
			`};
	`,

	HiddenButton: styled.button`
		height: 0;
		width: 0;
		position: absolute;
		left: -99999px;
		top: -99999px;
	`,
};

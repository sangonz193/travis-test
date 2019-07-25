import { transparentize } from "polished";
import styled, { css, keyframes } from "styled-components";

const animation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
  }  `;

export const styles = {
	Wrapper: styled.div`
		position: relative;
		margin-bottom: auto;
		height: 50px;
		width: 50px;
		margin: 0 auto auto;
	`,

	Container: styled.div`
		position: relative;
		flex: 1;
		margin: 6px;
	`,

	Loading: styled.div`
		${p => css`
			&,
			&:after {
				border-radius: 50%;
				width: 100%;
				height: 100%;
			}

			position: relative;
			margin: 0.1px;
			border: 6px solid ${transparentize(0.8, p.theme.accentColor)};
			border-left: 6px solid ${p.theme.accentColor};
			animation: ${animation} 1.1s infinite linear;
		`}
	`,
};

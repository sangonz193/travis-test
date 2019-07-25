import { rgba } from "polished";
import { OnHover } from "src/style/Mixins";
import styled, { css } from "styled-components";

export const styles = {
	Button: styled.a`
		flex-basis: 50px;
		padding: 10px;

		${OnHover(css`
			&:hover {
				background-color: ${rgba(0, 0, 0, 0.1)};
			}
		`)}
	`,

	EVA: styled.img``,
};

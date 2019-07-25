import styled from "styled-components";

export const styles = {
	Button: styled.button`
		display: flex;
		border: none;
		padding: 0;
		margin: 0;
		text-decoration: none;
		background: transparent;
		color: #000;
		cursor: pointer;
		text-align: center;

		&:hover,
		&:focus {
			background: transparent;
			outline: none;
		}
	`,
};

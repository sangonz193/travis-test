import styled from "styled-components";

export const styles = {
	Container: styled.div`
		flex-direction: row;
		height: ${p => p.theme.rowHeight}px;
		flex: 0 0 auto;
	`,

	Input: styled.input`
		flex: 1 1 100%;
		margin: 7px 0px;
		padding: 0 5px;
	`,
};

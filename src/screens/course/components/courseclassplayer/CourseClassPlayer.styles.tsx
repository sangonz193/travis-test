import { Loading } from "src/components/loading/Loading";
import styled, { css } from "styled-components";
import { Controls } from "./components/controls/Controls";
import { Video } from "./components/video/Video";

export const styles = {
	Wrapper: styled.div<{ showCursor: boolean; fullscreen: boolean }>`
		position: relative;
		width: 100%;
		justify-content: center;

		${({ showCursor }) =>
			showCursor &&
			css`
				cursor: none;
			`};

		${({ fullscreen }) =>
			fullscreen &&
			css`
				&,
				&:focus {
					background-color: #000;
				}
			`};
	`,

	Video: styled(Video)`
		background-color: transparent;
		width: 100%;
		max-height: 100%;
		flex-shrink: 1;
	`,

	Controls: styled(Controls)`
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	`,

	Loading: styled(Loading)`
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		align-self: center;
	`,

	OverlayContainer: styled.div`
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		pointer-events: none;
		z-index: 1;

		* > {
			pointer-events: auto;
		}
	`,
};

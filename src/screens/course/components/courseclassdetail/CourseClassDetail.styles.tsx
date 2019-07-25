import { CreativeCommons } from "src/components/creativecommons/CreativeCommons";
import { CourseClassPlayer } from "src/screens/course/components/courseclassplayer/CourseClassPlayer";
import { DownloadButton } from "src/screens/course/components/downloadbutton/DownloadButton";
import { ShareButton } from "src/screens/course/components/sharebutton/ShareButton";
import { Breakpoint, Mixins } from "src/style";
import styled, { css } from "styled-components";

const itemsStyle = css`
	margin: 10px auto;
	width: 100%;
	max-width: 1280px;
	padding: 0 20px;
`;

export const styles = {
	Wrapper: styled.div`
		${p => css`
			overflow: auto;

			> :nth-last-child(2) {
				margin-bottom: ${p.theme.rowHeight}px;
			}
		`}
	`,

	CourseImage: styled.img`
		min-height: 0;
		min-width: 0;
		width: 300px;
		height: 300px;
		max-height: 90%;
		max-width: 90%;
		margin: auto;
		opacity: 0.5;
	`,

	CourseClassPlayer: styled(CourseClassPlayer)`
		${p => css`
			min-height: 200px;
			max-height: 75vh;

			${Mixins.WiderThan(
				Breakpoint.md,
				css`
					min-height: 300px;
				`
			)}
		`};
	`,

	CourseClassTitle: styled.span`
		align-self: center;
		${itemsStyle};
		padding-top: 10px;
		padding-bottom: 10px;

		font-size: 24px;
	`,

	CreativeCommons: styled(CreativeCommons)`
		width: auto;
	`,

	VideoButtonsContainer: styled.div`
		${p => css`
			flex-direction: row;
			${itemsStyle};
			margin: 0 auto ${p.theme.rowHeight}px auto;
			overflow: auto;
		`}
	`,

	DownloadButton: styled(DownloadButton)`
		padding: 0 10px;
		&:not(:last-child) {
			margin-right: 20px;
		}
	`,

	ShareButton: styled(ShareButton)`
		padding: 0 10px;
		&:not(:last-child) {
			margin-right: 20px;
		}
	`,
};

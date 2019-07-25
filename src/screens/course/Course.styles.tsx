import { CreativeCommons } from "src/components/creativecommons/CreativeCommons";
import { CourseClassDetail } from "src/screens/course/components/courseclassdetail/CourseClassDetail";
import { CourseClassMaster } from "src/screens/course/components/courseclassmaster/CourseClassMaster";
import { Breakpoint, Mixins } from "src/style";
import styled, { css } from "styled-components";
import { CourseURL } from "./components/courseurl/CourseURL";

export const styles = {
	Wrapper: styled.div`
		flex: 1 1 100%;
		flex-direction: column;
		overflow: auto;
		position: relative;

		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				flex-direction: row-reverse;
			`
		)};
	`,

	CourseClassMaster: styled(CourseClassMaster)`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		background-color: white;
		box-shadow: 0 0 5px rgba(67, 52, 52, 0.3);

		overflow: auto;

		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				order: 1;
				position: relative;
				width: 100%;
				max-width: 350px;
			`
		)};
	`,

	CourseClassDetail: styled(CourseClassDetail)`
		flex: 0 0 auto;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		background-color: white;

		${Mixins.WiderThan(
			Breakpoint.sm,
			css`
				position: static;
				flex: 1 1 auto;

				overflow: auto;
			`
		)};
	`,

	CreativeCommons: styled(CreativeCommons)`
		width: auto;
	`,

	CourseButton: styled(CourseURL)``,
};

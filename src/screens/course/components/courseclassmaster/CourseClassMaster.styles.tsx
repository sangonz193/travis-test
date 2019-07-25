import { CreativeCommons } from "src/components/creativecommons/CreativeCommons";
import { CourseClassList } from "src/screens/course/components/courseclasslist/CourseClassList";
import styled from "styled-components";

export const styles = {
	Wrapper: styled.div``,

	SelectCourseClassListWrapper: styled.div`
		flex-direction: row;
		justify-content: flex-end;
		flex: 0 0 ${p => p.theme.rowHeight}px;
	`,

	SelectCourseClassList: styled.select`
		margin: 7px 5px 7px 0;
		align-items: center;
		flex-direction: row;
		width: 100px;
	`,

	CourseClassList: styled(CourseClassList)``,

	CreativeCommons: styled(CreativeCommons)`
		width: auto;
	`,
};

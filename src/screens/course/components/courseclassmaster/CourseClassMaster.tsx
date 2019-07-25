import { useCallback, useContext } from "react";

import { AppStoreContext } from "src/components/AppStoreContext";
import { Breakpoint } from "src/style";
import React from "react";
import { getCoursePath } from "src/routes";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseClassMaster.styles";
import { useCourse } from "src/screens/course/useCourse";
import { useHistory } from "src/hooks/useHistory";

export type CourseClassMasterProps = {
	className?: string;
};

export const CourseClassMaster = observer((props: CourseClassMasterProps) => {
	const appStore = useContext(AppStoreContext);
	const { history } = useHistory();
	const { course, courseClassList } = useCourse();
	const courseClassLists = course && course.classLists;

	const handleChange = useCallback<React.ChangeEventHandler<HTMLSelectElement>>(
		e => {
			const courseClassListId = Number(e.target.value);
			if (!course || Number.isNaN(courseClassListId)) return;

			history.replace(
				getCoursePath({
					courseCode: course.code!,
					courseClassListId,
				})
			);
		},
		[course]
	);

	return (
		<styles.Wrapper className={props.className}>
			{courseClassLists && courseClassLists.length > 1 && (
				<styles.SelectCourseClassListWrapper>
					<styles.SelectCourseClassList value={courseClassList && courseClassList.id} onChange={handleChange}>
						{courseClassLists.map(ccl => (
							<option key={ccl.id} value={ccl.id}>
								{ccl.name}
							</option>
						))}
					</styles.SelectCourseClassList>
				</styles.SelectCourseClassListWrapper>
			)}

			<styles.CourseClassList />

			{appStore.breakpoint < Breakpoint.sm && <styles.CreativeCommons />}
		</styles.Wrapper>
	);
});

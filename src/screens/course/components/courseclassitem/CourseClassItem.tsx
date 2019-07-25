import { Models } from "openfing-core";
import React from "react";
import { getCoursePath } from "src/routes";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseClassItem.styles";
import { useCourse } from "src/screens/course/useCourse";
import { useRouteURL } from "src/hooks/useRoute";

export type CourseClassItemProps = {
	className?: string;
	courseClass: Models.CourseClass;
	isLast: boolean;
};

export const CourseClassItem = observer((props: CourseClassItemProps) => {
	const context = useCourse();
	const { className, courseClass, isLast } = props;

	const courseCode = context.course ? context.course.code : undefined;
	const courseClassListId = courseClass.courseClassList ? courseClass.courseClassList.id : undefined;
	const courseClassId = courseClass.id;
	const [url] = useRouteURL(
		() =>
			courseCode
				? getCoursePath({
						courseCode,
						courseClassListId,
						courseClassId,
				  })
				: "",
		[courseCode, courseClassListId, courseClassId]
	);

	const isActive = !!context.courseClass && context.courseClass.id === props.courseClass.id;

	return (
		<styles.Wrapper className={className} href={url} isActive={isActive}>
			<styles.ContentContainer isActive={isActive}>
				<styles.Number>{courseClass.number}</styles.Number>

				<styles.Title>{courseClass.title}</styles.Title>
			</styles.ContentContainer>

			{!isLast && !isActive && <styles.Divider />}
		</styles.Wrapper>
	);
});

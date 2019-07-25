import React, { useMemo } from "react";

import { Models } from "openfing-core";
import { getCoursePath } from "src/routes";
import { observer } from "mobx-react-lite";
import { styles } from "./UpdateItem.styles";
import { useRouteURL } from "src/hooks/useRoute";

export type UpdateItemProps = {
	className?: string;
	courseClass: Models.CourseClass;
};

export const UpdateItem = observer((props: UpdateItemProps) => {
	const { className, courseClass } = props;

	const { courseClassList } = courseClass;
	const courseClassListId = courseClassList ? courseClassList.id : undefined;
	const courseClassId = courseClass.id;
	const course = courseClassList ? courseClassList.course : undefined;
	const courseCode = course ? course.code : undefined;
	const [url] = useRouteURL(
		() =>
			courseCode
				? getCoursePath({
						courseCode,
						courseClassId,
						courseClassListId,
				  })
				: "",
		[courseCode, courseClassId, courseClassListId]
	);

	const title = useMemo(() => {
		if (!courseClass.title) return "";

		if (!courseClass.number) return courseClass.title;

		return `${courseClass.number} - ${courseClass.title}`;
	}, [courseClass.number, courseClass.title]);

	const createdAt = useMemo(() => (courseClass.createdAt ? courseClass.createdAt.format("DD/MM") : null), [
		courseClass.createdAt,
	]);

	return (
		<styles.Wrapper className={className} href={url}>
			<styles.Icon src={course ? course.iconURL : undefined} />

			<styles.InfoContainer>
				<styles.InfoContainerHeader>
					<styles.CourseName>{course && course.name}</styles.CourseName>
					{createdAt && <styles.CreatedAt>{createdAt}</styles.CreatedAt>}
				</styles.InfoContainerHeader>

				<styles.Title>{title}</styles.Title>
			</styles.InfoContainer>
		</styles.Wrapper>
	);
});

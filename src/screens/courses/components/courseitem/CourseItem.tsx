import { Models } from "openfing-core";
import React from "react";
import { getCoursePath } from "src/routes";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseItem.styles";
import { useRouteURL } from "src/hooks/useRoute";

export type CourseItemProps = {
	className?: string;
	course: Models.Course;
	isLast: boolean;
};

export const CourseItem = observer((props: CourseItemProps) => {
	const { className, course, isLast } = props;

	const [url] = useRouteURL(() => getCoursePath({ courseCode: course.code! }), [course.code]);

	return (
		<styles.Wrapper>
			<styles.Container className={className} href={url}>
				<styles.Icon src={course.iconURL} />

				<styles.Name>{course.name}</styles.Name>
			</styles.Container>

			{!isLast && <styles.Divider />}
		</styles.Wrapper>
	);
});

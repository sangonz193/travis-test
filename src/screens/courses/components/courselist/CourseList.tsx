import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseList.styles";
import { useCourseSearch } from "openfing-core/lib/hooks/useCourseSearch";

export type CourseListProps = {
	className?: string;
};

export const CourseList = observer(({ className }: CourseListProps) => {
	const { results } = useCourseSearch();

	return (
		<styles.Wrapper className={className}>
			{results.map((course, index) => (
				<styles.CourseItem key={course.id} course={course} isLast={index === results.length - 1} />
			))}
		</styles.Wrapper>
	);
});

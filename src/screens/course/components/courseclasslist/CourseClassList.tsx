import { observer } from "mobx-react-lite";
import React from "react";
import { useCourse } from "src/screens/course/useCourse";
import { styles } from "./CourseClassList.styles";

export type CourseClassListProps = {
	className?: string;
};

export const CourseClassList = observer(({ className }: CourseClassListProps) => {
	const { courseClassList } = useCourse();

	return (
		<styles.Wrapper className={className}>
			{courseClassList &&
				courseClassList.classes &&
				courseClassList.classes.map((courseClass, index) => (
					<styles.CourseClassItem
						key={courseClass.id}
						courseClass={courseClass}
						isLast={courseClassList.classes!.length - 1 === index}
					/>
				))}
		</styles.Wrapper>
	);
});

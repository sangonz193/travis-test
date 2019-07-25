import { Models } from "openfing-core";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./UpdateList.styles";
import { useRootStore } from "openfing-core/lib/hooks/useRootStore";

export type UpdateListProps = {
	className?: string;
};

const UpdateItemWrapper = observer(
	({ courseClass, index, total }: { courseClass: Models.CourseClass; index: number; total: number }) => {
		const isLast = index === total - 1;

		return (
			<>
				<styles.UpdateItem courseClass={courseClass} />

				{!isLast && <styles.Divider />}
			</>
		);
	}
);

export const UpdateList = observer(({ className }: UpdateListProps) => {
	const { latestCourseClasses } = useRootStore().courseClassStore;

	return (
		<styles.Wrapper className={className}>
			{latestCourseClasses.map((courseClass, index) => (
				<UpdateItemWrapper
					key={courseClass.id}
					courseClass={courseClass}
					index={index}
					total={latestCourseClasses.length}
				/>
			))}
		</styles.Wrapper>
	);
});

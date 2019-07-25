import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseClassDetail.styles";
import { useCourse } from "../../useCourse";

export type CourseClassDetailProps = {
	className?: string;
};

export const CourseClassDetail = observer((props: CourseClassDetailProps) => {
	const { courseClass, course } = useCourse();

	return (
		<styles.Wrapper className={props.className}>
			{courseClass ? (
				<>
					<styles.CourseClassPlayer />
					<styles.CourseClassTitle>{courseClass.title}</styles.CourseClassTitle>

					<styles.VideoButtonsContainer>
						<styles.DownloadButton />
						<styles.ShareButton />
					</styles.VideoButtonsContainer>

					<styles.CreativeCommons />
				</>
			) : (
				course && <styles.CourseImage src={course.iconURL} />
			)}
		</styles.Wrapper>
	);
});

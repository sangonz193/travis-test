import EVA from "src/assets/images/EVA.svg";
import { Models } from "openfing-core";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./CourseURL.styles";

export type CourseURLProps = {
	course: Models.Course;
	className?: string;
};

export const CourseURL = observer<CourseURLProps>(props =>
	props.course.eva ? (
		<styles.Button className={props.className} href={props.course.eva}>
			<styles.EVA src={EVA} />
		</styles.Button>
	) : null
);

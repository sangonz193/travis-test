import { CourseClassList } from "../CourseClassList";
import { CourseProvider } from "src/screens/course/useCourse";
import { Models } from "openfing-core";
import React from "react";
import { assign } from "openfing-core/lib/helpers";
import moment from "moment";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Container = styled.div`
	margin: auto;
	max-width: 400px;
	width: 100%;
`;

const courseClass = new Models.CourseClass(1);
assign(courseClass, {
	number: 1,
	title: "Test",
	createdAt: moment("2019-03-19"),
});
const courseClasses = [courseClass, courseClass];

const courseClassList = new Models.CourseClassList(1);
assign(courseClassList, {
	name: "Test",
	createdAt: moment("2019-03-19"),
	classes: courseClasses,
});

const Default = () => (
	<CourseProvider
	// value={observable({ courseClassList, courseClassPlayerController: new CourseClassPlayerController() })} TODO
	>
		<CourseClassList />
	</CourseProvider>
);

storiesOf("Course|CourseClassList", module)
	.addDecorator(story => <Container>{story()}</Container>)
	.add("Default", () => <Default />);

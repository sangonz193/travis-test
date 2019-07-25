import { Models } from "openfing-core";
import React from "react";
import { UpdateItem } from "../UpdateItem";
import { assign } from "openfing-core/lib/helpers";
import moment from "moment";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Container = styled.div`
	margin: auto;
	min-width: 400px;
	width: 100px;
`;

const Content = styled.div`
	background-color: palevioletred;
`;

const courseClass = new Models.CourseClass(1);
assign(courseClass, {
	number: 1,
	title: "Test",
	createdAt: moment("2019-03-19"),
});

const courseClassList = new Models.CourseClassList(1);
courseClass.courseClassList = courseClassList;

const course = new Models.Course(1);
assign(course, {
	code: "tst",
	name: "Test course",
	iconURL: "https://open.fing.edu.uy/api-data/courseicons/defaulticon.svg",
});
courseClassList.course = course;

storiesOf("UpdateItem", module)
	.addDecorator(story => (
		<Container>
			<Content>{story()}</Content>
		</Container>
	))
	.add("Default", () => <UpdateItem courseClass={courseClass} />);

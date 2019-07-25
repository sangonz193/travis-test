import { CourseClassItem } from "../CourseClassItem";
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

storiesOf("Course|CourseClassItem", module)
	.addDecorator(story => <Container>{story()}</Container>)
	.add("Default", () => <CourseClassItem courseClass={courseClass} isLast={false} />);

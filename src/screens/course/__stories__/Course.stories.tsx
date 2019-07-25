import { Course } from "../Course";
import { Layout } from "../../../layout/Layout";
import { Models } from "openfing-core";
import React from "react";
import { assign } from "openfing-core/lib/helpers";
import moment from "moment";
import { storiesOf } from "@storybook/react";

const courseClass = new Models.CourseClass(1);
assign(courseClass, {
	number: 1,
	title: "Test",
	createdAt: moment("2019-03-19"),
});

const Default = () => (
	<Layout routeKey="Course">
		<Course match={{ isExact: false, params: { courseCode: "civ" }, path: "", url: "" }} />
	</Layout>
);

storiesOf("Course|Course", module).add("Default", () => <Default />);

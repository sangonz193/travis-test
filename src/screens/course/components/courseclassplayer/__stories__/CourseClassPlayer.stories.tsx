import { CourseClassPlayer } from "../CourseClassPlayer";
import { CourseProvider } from "src/screens/course/useCourse";
import { Models } from "openfing-core";
import React from "react";
import { assign } from "openfing-core/lib/helpers";
import { storiesOf } from "@storybook/react";

let quality = new Models.VideoQuality(1);

const formats: Models.VideoFormat[] = [];
let format = new Models.VideoFormat(1);

assign(format, {
	name: "webm",
	url: "http://openfing-video.fing.edu.uy/media/civ/civ_01.webm",
});
formats.push(format);

format = new Models.VideoFormat(2);
assign(format, {
	name: "mp4",
	url: "http://openfing-video.fing.edu.uy/media/civ/civ_01.mp4",
});
formats.push(format);

assign(quality, {
	height: 1080,
	width: 1920,
	formats,
});

const video = new Models.Video(1);
assign(video, {
	qualities: [quality],
});

const courseClass = new Models.CourseClass(1);
assign(courseClass, {
	videos: [video],
});

const Default = () => {
	return (
		<CourseProvider>
			{/*value={courseContextValue} TODO*/}
			<CourseClassPlayer />
		</CourseProvider>
	);
};

storiesOf("CourseClassPlayer", module).add("Default", () => <Default />);

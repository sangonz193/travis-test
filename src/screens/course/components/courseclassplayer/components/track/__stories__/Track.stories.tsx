import { CourseContext, CourseProvider } from "src/screens/course/useCourse";

import React from "react";
import { Track } from "../Track";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Default = () => {
	const contextRef = React.useRef<CourseContext>(new CourseContext());
	const StyledTrack = React.useRef(
		styled(Track)`
			margin-top: auto;
		`
	);

	React.useEffect(() => {
		contextRef.current.courseClassPlayerController["_duration"] = 20000;
		contextRef.current.courseClassPlayerController["_currentTime"] = 2000;
	}, []);

	return (
		<CourseProvider contextRef={contextRef}>
			<StyledTrack.current />
		</CourseProvider>
	);
};

storiesOf("Track", module).add("Default", () => <Default />);

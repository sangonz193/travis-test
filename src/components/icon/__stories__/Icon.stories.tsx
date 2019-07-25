import { Icon } from "../Icon";
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Container = styled.div`
	margin: auto;
	width: 100px;
`;

const Content = styled.div`
	background-color: palevioletred;
`;

storiesOf("Icon", module)
	.addDecorator(story => (
		<Container>
			<Content>{story()}</Content>
		</Container>
	))
	.add("ExitFullscreen", () => <Icon name="exit_fullscreen" />)
	.add("Fullscreen", () => <Icon name="fullscreen" />)
	.add("Help", () => <Icon name="help" />)
	.add("House", () => <Icon name="house" />)
	.add("News", () => <Icon name="new" />)
	.add("Pause", () => <Icon name="pause" />)
	.add("Play", () => <Icon name="play" />)
	.add("VideoCamera", () => <Icon name="video_camera" />);

import { BaseIconProps } from "./components/Base";
import { Download } from "./components/Download";
import { ExitFullscreen } from "./components/ExitFullscreen";
import { Fullscreen } from "./components/Fullscreen";
import { Help } from "./components/Help";
import { House } from "./components/House";
import { New } from "./components/New";
import { Pause } from "./components/Pause";
import { Play } from "./components/Play";
import React from "react";
import { Share } from "./components/Share";
import { VideoCamera } from "./components/VideoCamera";
import { VolumeMax } from "./components/VolumeMax";
import { VolumeMedium } from "./components/VolumeMedium";
import { VolumeMin } from "./components/VolumeMin";
import { VolumeMute } from "./components/VolumeMute";
import styled from "styled-components";

const styles = styled.div`
	max-height: 100%;
	max-width: 100%;
`;

const source = {
	download: styles.withComponent(Download),
	exit_fullscreen: styles.withComponent(ExitFullscreen),
	fullscreen: styles.withComponent(Fullscreen),
	help: styles.withComponent(Help),
	house: styles.withComponent(House),
	new: styles.withComponent(New),
	pause: styles.withComponent(Pause),
	play: styles.withComponent(Play),
	share: styles.withComponent(Share),
	video_camera: styles.withComponent(VideoCamera),
	volume_max: styles.withComponent(VolumeMax),
	volume_medium: styles.withComponent(VolumeMedium),
	volume_min: styles.withComponent(VolumeMin),
	volume_mute: styles.withComponent(VolumeMute),
};

export type IconName = keyof typeof source;

export type IconProps = BaseIconProps & {
	name: IconName;
};

export const Icon: React.FunctionComponent<IconProps> = ({ name, ...rest }) => {
	const Component = source[name];

	return <Component {...rest} />;
};

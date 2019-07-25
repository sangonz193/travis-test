import React, { useEffect } from "react";

import { Models } from "openfing-core";
import { observer } from "mobx-react-lite";
import { styles } from "./Video.styles";
import { useCourse } from "src/screens/course/useCourse";

export type VideoProps = {
	className?: string;
	quality: Models.VideoQuality;
	videoRef: React.RefObject<HTMLVideoElement>;
};

export const Video: React.FunctionComponent<VideoProps> = observer(props => {
	const { urlHash } = useCourse();
	const { className, quality } = props;
	const { formats } = quality;

	useEffect(() => {
		if (props.videoRef.current) props.videoRef.current.load();
	}, [formats]);

	return (
		<styles.Video ref={props.videoRef} className={className} autoPlay={true}>
			{formats &&
				formats.map(format => (
					<source key={format.id} src={format.url + (urlHash || "")} type={`video/${format.name}`} />
				))}
		</styles.Video>
	);
});

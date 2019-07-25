import React, { useContext } from "react";

import { CourseClassPlayerController } from "./components/courseclassplayer/CourseClassPlayer.controller";
import { FetchCourseByCodeState } from "openfing-core/lib/stores/CourseStore";
import { Models } from "openfing-core";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";

export class CourseContext {
	@observable public fetchCourseByCodeState: FetchCourseByCodeState | undefined; // TODO: change for useQueryOutput
	@observable public course: Models.Course | undefined;
	@observable public courseClassList: Models.CourseClassList | undefined;
	@observable public courseClass?: Models.CourseClass | undefined;
	@observable public courseClassPlayerController = new CourseClassPlayerController();
	@observable public video: Models.Video | undefined;
	@observable public videoQuality: Models.VideoQuality | undefined;
	@observable public videoFormat: Models.VideoFormat | undefined;

	public urlHash: string | undefined;
}

const context = React.createContext<CourseContext>(null as any);

export type CourseProviderProps = {
	contextRef?: React.MutableRefObject<CourseContext | undefined>;
};
export const CourseProvider: React.FunctionComponent<CourseProviderProps> = observer(props => {
	const contextRef = React.useRef<CourseContext>();
	if (!contextRef.current) contextRef.current = new CourseContext();
	if (props.contextRef) props.contextRef.current = contextRef.current;

	return <context.Provider value={contextRef.current}>{props.children}</context.Provider>;
});

export const useCourse: () => CourseContext = () => {
	return useContext(context);
};

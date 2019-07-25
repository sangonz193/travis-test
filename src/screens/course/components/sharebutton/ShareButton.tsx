import { AppStoreContext } from "src/components/AppStoreContext";
import { Models } from "openfing-core";
import React from "react";
import { getCoursePath } from "src/routes";
import { observer } from "mobx-react-lite";
import { secondsToString } from "openfing-core/lib/helpers";
import { styles } from "./ShareButton.styles";
import { useCourse } from "src/screens/course/useCourse";
import { useRouteURL } from "src/hooks/useRoute";

export type DownloadButtonProps = {
	className?: string;
};

type ReducerState = {
	courseClass?: Models.CourseClass;
	showOverlay: boolean;
	startOn: boolean;
	startOnSeconds: number;
	startOnInputValue: string;

	courseCode?: string;
	courseClassListId?: number;
	courseClassNumber?: number;
};
type ReducerAction =
	| {
			type: "hide-overlay" | "toggle-start-on" | "calculate-url";
	  }
	| {
			type: "show-overlay";
			seconds: number | undefined;
	  }
	| {
			type: "reset";
			courseClass: Models.CourseClass | undefined;
	  }
	| {
			type: "update-input-value";
			value: string;
	  };

const init = (courseClass: Models.CourseClass | undefined): ReducerState => {
	const courseClassList = courseClass && courseClass.courseClassList;
	const course = courseClassList && courseClassList.course;

	return {
		...(courseClass &&
			course && {
				courseClassNumber: courseClass.number!,
				courseClassListId: courseClassList && courseClassList.id,
				courseCode: course.code,
			}),
		courseClass,
		showOverlay: false,
		startOn: false,
		startOnSeconds: 0,
		startOnInputValue: "00:00:00",
	};
};

const reducer: React.Reducer<ReducerState, ReducerAction> = (prevState, action) => {
	if (action.type === "show-overlay")
		return {
			...prevState,
			showOverlay: true,
			startOnSeconds: action.seconds ? Math.floor(action.seconds) : 0,
			startOnInputValue: secondsToString(action.seconds || 0),
		};

	if (action.type === "hide-overlay")
		return {
			...prevState,
			showOverlay: false,
		};

	if (action.type === "toggle-start-on")
		return {
			...prevState,
			startOn: !prevState.startOn,
		};

	if (action.type === "update-input-value")
		return {
			...prevState,
			startOnInputValue: action.value,
		};

	if (action.type === "reset") return init(action.courseClass);

	if (action.type === "calculate-url") {
		let value = prevState.startOnInputValue.trim();
		const array = value.length === 0 ? [] : value.split(":");
		let seconds: number | undefined;

		if (array.length === 1) {
			const parsedSeconds = Number(array[0]);

			if (!Number.isNaN(parsedSeconds)) seconds = parsedSeconds;
		} else if (array.length === 2) {
			const parsedMinutes = Number(array[0]);
			const parsedSeconds = Number(array[1]);

			seconds = Number.isNaN(parsedMinutes)
				? undefined
				: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds);
		} else if (array.length > 2) {
			const parsedHours = Number(array[0]);
			const parsedMinutes = Number(array[1]);
			const parsedSeconds = Number(array[2]);

			seconds = Number.isNaN(parsedHours)
				? undefined
				: parsedHours * 60 * 60 +
				  (Number.isNaN(parsedMinutes)
						? 0
						: parsedMinutes * 60 + (Number.isNaN(parsedSeconds) ? 0 : parsedSeconds));
		}

		if (seconds !== undefined) {
			seconds = Math.floor(seconds);
			value = secondsToString(seconds);
		} else seconds = 0;

		return {
			...prevState,
			startOnInputValue: value,
			startOnSeconds: seconds,
		};
	}

	return init(prevState.courseClass);
};

export const ShareButton: React.FunctionComponent<DownloadButtonProps> = observer<DownloadButtonProps>(props => {
	const context = useCourse();
	const appStore = React.useContext(AppStoreContext);
	const referenceElementRef = React.useRef<HTMLButtonElement>(null);
	const copyButtonRef = React.useRef<HTMLButtonElement>(null);
	const [state, dispatch] = React.useReducer(reducer, context.courseClass, init);

	const { courseCode, courseClassListId, courseClassNumber, startOnSeconds } = state;
	const [url] = useRouteURL(() => {
		if (!courseCode || !courseClassListId || !courseClassNumber) return "";

		return {
			url: getCoursePath({
				courseCode,
				courseClassListId,
				courseClassNumber,
				showOnSeconds: state.startOn ? startOnSeconds : undefined,
			}),
			useBaseURL: true,
		};
	}, [courseCode, courseClassListId, courseClassNumber, state.startOn, startOnSeconds]);

	const { courseClass } = context;
	const courseClassList = courseClass && courseClass.courseClassList;
	const course = courseClassList && courseClassList.course;
	React.useEffect(() => {
		dispatch({ type: "reset", courseClass: context.courseClass });
	}, [courseClass, courseClassList, course]);

	const handleCopy = React.useCallback(() => {
		appStore.copyToClipboard(url);
	}, [url]);

	return (
		<>
			<styles.Modal
				isVisible={state.showOverlay}
				onDismiss={() => dispatch({ type: "hide-overlay" })}
				onCloseAnimationFinish={() => dispatch({ type: "hide-overlay" })}
			>
				<styles.ModalContent>
					<styles.ModalHeader>
						<styles.ModalTitle>Compartir</styles.ModalTitle>
					</styles.ModalHeader>

					<styles.ModalRow>
						<styles.LinkInput readOnly={true} value={url} />

						<styles.CopyButton buttonRef={copyButtonRef} onClick={handleCopy}>
							Copiar
						</styles.CopyButton>
					</styles.ModalRow>

					<styles.ModalRow>
						<styles.StartOnLabel>
							<styles.StartOnCheckbox
								checked={state.startOn}
								onChange={() => dispatch({ type: "toggle-start-on" })}
							/>
							Iniciar en:
						</styles.StartOnLabel>

						<styles.StartOnInput
							value={state.startOnInputValue}
							disabled={!state.startOn}
							onChangeText={value => dispatch({ type: "update-input-value", value })}
							onBlur={() => dispatch({ type: "calculate-url" })}
						/>
					</styles.ModalRow>
				</styles.ModalContent>
			</styles.Modal>

			<styles.Button
				buttonRef={referenceElementRef}
				className={props.className}
				iconName="share"
				onClick={() =>
					dispatch({ type: "show-overlay", seconds: context.courseClassPlayerController.currentTime })
				}
			>
				Compartir
			</styles.Button>
		</>
	);
});

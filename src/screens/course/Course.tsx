import { CourseContext, CourseProvider } from "./useCourse";
import React, { useContext, useEffect, useMemo } from "react";
import { observer, useComputed } from "mobx-react-lite";

import { AppStoreContext } from "src/components/AppStoreContext";
import { Breakpoint } from "src/style";
import { LayoutContext } from "../../layout/Layout";
import { Loading } from "src/components/loading/Loading";
import { NavigationComponentProps } from "../../navigation/Navigator";
import { courseFromJSON } from "openfing-core/lib/factories";
import gql from "graphql-tag";
import queryString from "query-string";
import { styles } from "./Course.styles";
import { useDocumentTitle } from "../../components/useDocumentTitle";
import { useHistory } from "src/hooks/useHistory";
import { useQuery } from "react-apollo-hooks";
import { useRootStore } from "openfing-core/lib/hooks/useRootStore";

type CourseData = {
	courseByCode: {
		id: number;
		code: string;
		name?: string;
		eva?: string;
		iconURL?: string;
	};
};

const COURSE_QUERY = gql`
	query courseByCode($code: String!) {
		courseByCode(code: $code) {
			id
			code
			name
			eva
			semester
			year
			iconURL

			classLists {
				id
				name

				classes {
					id
					title
					number

					videos {
						id
						name
						position

						qualities {
							id
							height
							width

							formats {
								id
								name
								url
							}
						}
					}
				}
			}
		}
	}
`;

// TODO: custom useQuery with parseData callback?

const useForceUpdate = () => {
	const [, setB] = React.useState(false);

	return React.useCallback(() => {
		setB(b => !b);
	}, []);
};

export const Course: React.FunctionComponent<NavigationComponentProps<{ courseCode: string }>> = observer(props => {
	const { courseCode } = props.match.params;
	const forceUpdate = useForceUpdate();

	const { history } = useHistory();
	const queryParams = useMemo<{ t?: string; cci?: string; ccn?: string; ccl?: string }>(
		() => queryString.parse(history.location.search),
		[history.location.search]
	);
	const appStore = useContext(AppStoreContext);
	const { courseStore } = useRootStore();
	const course = courseStore.coursesByCode.get(courseCode) || undefined;

	const { loading, data, ...rest } = useQuery<CourseData>(COURSE_QUERY, {
		skip: !!course && !!course.classLists,
		variables: { code: courseCode },
	});
	React.useEffect(() => {
		if (!data || !data.courseByCode) return;

		courseStore.saveCourse(courseFromJSON(data.courseByCode));
		forceUpdate();
	}, [data]);

	const courseName = course ? course.name : undefined;
	const setLayoutOptions = useContext(LayoutContext);
	const contextRef = React.useRef<CourseContext>();

	useDocumentTitle(course && course.name ? `${course.name} - OpenFING` : "Curso - OpenFING");

	useEffect(() => {
		setLayoutOptions({
			header: {
				title: courseName ? courseName : "",
				right: course && <styles.CourseButton course={course} />,
			},
		});
	}, [setLayoutOptions, courseName, course]);

	const courseClassList =
		course && course.classLists && course.classLists.length > 0
			? queryParams.ccl
				? course.classLists.find(ccl => ccl.id.toString() === queryParams.ccl)
				: course.classLists[0]
			: undefined;
	const classes = courseClassList ? courseClassList.classes : undefined;
	const courseClass = useComputed(() => {
		if (!classes) return undefined;

		if (queryParams.cci) return classes.find(c => c.id.toString() === queryParams.cci);

		if (queryParams.ccn) return classes.find(c => !!c.number && c.number.toString() === queryParams.ccn);

		return undefined;
	}, [classes, queryParams]);
	useEffect(() => {
		const { current } = contextRef;

		if (!current) return;

		current.fetchCourseByCodeState = loading
			? { isLoading: loading }
			: course
			? { isLoading: false, success: true, course }
			: { isLoading: false, success: undefined };
		current.course = course;
		current.courseClassList = courseClassList;
		current.courseClass = courseClass;
	}, [loading, course, courseClassList, courseClass]);

	useEffect(() => {
		if (!contextRef.current) return;
		contextRef.current.urlHash = queryParams.t ? "#t=" + queryParams.t : history.location.hash;
	}, [queryParams.t, history.location.hash]);

	const detail = (queryParams.ccn || queryParams.cci || appStore.breakpoint > Breakpoint.xs) && (
		<styles.CourseClassDetail key="detail" />
	);

	const master = <styles.CourseClassMaster key="master" />;

	const content = (
		<styles.Wrapper>
			{appStore.breakpoint < Breakpoint.sm ? (
				<>
					{master}
					{detail}
				</>
			) : (
				<>
					{detail}
					{master}
				</>
			)}
		</styles.Wrapper>
	);

	return (
		<CourseProvider contextRef={contextRef}>{loading ? <Loading /> : course ? content : <div />}</CourseProvider>
	);
});

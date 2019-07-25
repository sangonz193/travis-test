import React, { useContext } from "react";

import { CourseSearchProvider } from "openfing-core/lib/hooks/useCourseSearch";
import { LayoutContext } from "../../layout/Layout";
import { Loading } from "src/components/loading/Loading";
import { NavigationComponentProps } from "../../navigation/Navigator";
import { courseFromJSON } from "openfing-core/lib/factories";
import gql from "graphql-tag";
import { observer } from "mobx-react-lite";
import { styles } from "./Courses.styles";
import { useDocumentTitle } from "../../components/useDocumentTitle";
import { useQuery } from "react-apollo-hooks";
import { useRootStore } from "openfing-core/lib/hooks/useRootStore";

type CoursesData = {
	courses: Array<{
		id: number;
		code: string;
		name?: string;
		eva?: string;
		iconURL?: string;
	}>;
};

const COURSES_QUERY = gql`
	{
		courses {
			id
			code
			name
			eva
			iconURL
		}
	}
`;

export const Courses: React.FunctionComponent<NavigationComponentProps> = observer(() => {
	useDocumentTitle("Cursos - OpenFING");

	const [searchValue, setSearchValue] = React.useState("");
	const { courseStore } = useRootStore();
	const { loading, data } = useQuery<CoursesData>(COURSES_QUERY, { skip: courseStore.courseList.length > 0 });

	React.useEffect(() => {
		if (!data || !data.courses) return;

		const faqs = data.courses.map(c => courseStore.saveCourse(courseFromJSON(c)));
		courseStore.courseList = faqs;
	}, [data]);

	const setLayoutOptions = useContext(LayoutContext);
	React.useEffect(() => {
		setLayoutOptions({
			header: {
				title: <styles.SearchInput placeholder="Buscar" onChangeText={setSearchValue} />,
			},
		});
	}, [setLayoutOptions]);

	return (
		<CourseSearchProvider courses={courseStore.courseList} searchValue={searchValue} onValueChange={setSearchValue}>
			<styles.Wrapper>
				{loading ? (
					<Loading />
				) : (
					<>
						<styles.CourseList />

						<styles.CreativeCommons />
					</>
				)}
			</styles.Wrapper>
		</CourseSearchProvider>
	);
});

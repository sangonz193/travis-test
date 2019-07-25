import { LayoutContext } from "src/layout/Layout";
import { NavigationComponentProps } from "../../navigation/Navigator";
import React from "react";
import { styles } from "./Updates.styles";
import { useDocumentTitle } from "../../components/useDocumentTitle";
import { useFetchLatestCourseClasses } from "openfing-core/lib/hooks/useFetchLatestCourseClasses";

export const Updates: React.FunctionComponent<NavigationComponentProps> = () => {
	useDocumentTitle("Updates - OpenFING");
	useFetchLatestCourseClasses({ autoFetch: true });

	const setLayoutOptions = React.useContext(LayoutContext);
	React.useEffect(() => {
		setLayoutOptions({
			header: {
				title: "Actualizaciones",
			},
		});
	}, [setLayoutOptions]);

	return (
		<styles.Wrapper>
			<styles.UpdateList />

			<styles.CreativeCommons />
		</styles.Wrapper>
	);
};

import React, { useContext, useEffect } from "react";

import { LayoutContext } from "../../layout/Layout";
import { Loading } from "src/components/loading/Loading";
import { NavigationComponentProps } from "../../navigation/Navigator";
import { faqFromJSON } from "openfing-core/lib/factories";
import gql from "graphql-tag";
import { observer } from "mobx-react-lite";
import { styles } from "./FAQs.styles";
import { useDocumentTitle } from "../../components/useDocumentTitle";
import { useQuery } from "react-apollo-hooks";
import { useRootStore } from "openfing-core/lib/hooks/useRootStore";

type FAQsData = {
	faqs?: Nullable<
		Array<{
			id: number;
			title?: Nullable<string>;
			content?: Nullable<string>;
			isHTML?: Nullable<boolean>;
		}>
	>;
};
const FAQS_QUERY = gql`
	{
		faqs {
			id
			title
			content
			isHTML
		}
	}
`;

export const FAQs: React.FunctionComponent<NavigationComponentProps> = observer(() => {
	useDocumentTitle("FAQs - OpenFING");

	const { faqStore } = useRootStore();
	const { loading, data } = useQuery<FAQsData>(FAQS_QUERY, { skip: faqStore.faqList.length > 0 });

	React.useEffect(() => {
		if (!data || !data.faqs) return;

		const faqs = data.faqs.map(f => faqStore.saveFAQ(faqFromJSON(f)));
		faqStore.faqList = faqs;
	}, [data]);

	const setLayoutOptions = useContext(LayoutContext);
	useEffect(() => {
		setLayoutOptions({ header: { title: "FAQs" } });
	}, []);

	return (
		<styles.Wrapper>
			{loading && <Loading />}
			<styles.FAQList />

			<styles.CreativeCommons />
		</styles.Wrapper>
	);
});

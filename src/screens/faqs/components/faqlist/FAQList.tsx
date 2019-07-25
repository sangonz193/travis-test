import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./FAQList.styles";
import { useRootStore } from "openfing-core/lib/hooks/useRootStore";

export type FAQListProps = {
	className?: string;
};

export const FAQList = observer(({ className }: FAQListProps) => {
	const { faqList } = useRootStore().faqStore;

	return (
		<styles.Wrapper className={className}>
			{faqList.map((faq, index) => (
				<styles.FAQItem key={faq.id} faq={faq} isLast={index === faqList.length - 1} />
			))}
		</styles.Wrapper>
	);
});

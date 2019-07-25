import { Models } from "openfing-core";
import React from "react";
import { observer } from "mobx-react-lite";
import { styles } from "./FAQItem.styles";

export type FAQItemProps = {
	className?: string;
	faq: Models.FAQ;
	isLast: boolean;
};

export const FAQItem = observer((props: FAQItemProps) => {
	const { className, faq, isLast } = props;

	return (
		<styles.Wrapper className={className}>
			<styles.Title>{faq.title}</styles.Title>

			<styles.Content dangerouslySetInnerHTML={faq.isHTML && faq.content ? { __html: faq.content } : undefined}>
				{!faq.isHTML ? faq.content : undefined}
			</styles.Content>

			{!isLast && <styles.Divider />}
		</styles.Wrapper>
	);
});

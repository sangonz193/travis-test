import styled from "styled-components";
import { CreativeCommons } from "../../components/creativecommons/CreativeCommons";
import { FAQList } from "./components/faqlist/FAQList";

export const styles = {
	Wrapper: styled.div`
		background-color: white;
		flex: 1 1 100%;
		align-items: center;

		overflow: auto;
	`,

	FAQList: styled(FAQList)`
		max-width: 650px;
		width: 100%;
	`,

	CreativeCommons: styled(CreativeCommons)``,
};

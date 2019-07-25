import styled from "styled-components";
import { CreativeCommons } from "../../components/creativecommons/CreativeCommons";
import { UpdateList } from "./components/updatelist/UpdateList";

export const styles = {
	Wrapper: styled.div`
		flex: 1 1 100%;
		align-items: center;

		overflow: auto;
	`,

	UpdateList: styled(UpdateList)`
		max-width: 650px;
		width: 100%;
	`,

	CreativeCommons: styled(CreativeCommons)``,
};

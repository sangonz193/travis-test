import styled from "styled-components";
import { CreativeCommons } from "../../components/creativecommons/CreativeCommons";
import { TextInput } from "../../components/textinput/TextInput";
import { CourseList } from "./components/courselist/CourseList";

export const styles = {
	Wrapper: styled.div`
		flex: 1 1 100%;
		align-items: center;

		overflow-y: auto;
		overflow-x: hidden;
	`,

	SearchInput: styled(TextInput)`
		margin: auto;
		max-width: 600px;
		width: 90%;
	`,

	CourseList: styled(CourseList)`
		max-width: 650px;
		width: 100%;
	`,

	CreativeCommons: styled(CreativeCommons)``,
};

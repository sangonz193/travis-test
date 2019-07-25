import { darken, lighten } from "polished";
import { BaseButton } from "src/components/basebutton/BaseButton";
import { Modal } from "src/components/modal/Modal";
import { TextInput } from "src/components/textinput/TextInput";
import { VideoButton } from "src/screens/course/components/videobutton/VideoButton";
import { Mixins } from "src/style";
import styled, { css } from "styled-components";

export const styles = {
	Button: styled(VideoButton)``,

	Modal: styled(Modal)``,

	ModalContent: styled.div`
		padding: 10px 0;
	`,

	ModalHeader: styled.div`
		${p => css`
			flex-direction: row;
			height: ${p.theme.rowHeight}px;
		`};
	`,

	ModalTitle: styled.span`
		align-self: center;
		font-weight: bold;

		margin: 0 20px;
	`,

	ModalRow: styled.div`
		${p => css`
			flex-direction: row;
			height: ${p.theme.rowHeight}px;
			margin: 0 20px;
		`};
	`,

	LinkInput: styled(TextInput)`
		flex: 1 1 auto;
	`,

	CopyButton: styled(BaseButton)`
		${p => css`
			justify-content: center;
			margin: 7px 0;
			padding: 0 7px;

			color: white;
			background-color: ${p.theme.accentColor};

			${Mixins.OnHover(css`
				background-color: ${lighten(0.1, p.theme.accentColor)};
			`)};

			&:focus {
				background-color: ${darken(0.1, p.theme.accentColor)};
			}
		`};
	`,

	StartOnLabel: styled.label`
		flex-direction: row;
		align-items: center;
	`,

	StartOnCheckbox: styled.input.attrs({ type: "checkbox" })`
		${p => css`
			margin: 0;
		`};
	`,

	StartOnInput: styled(TextInput)`
		margin-left: 10px;
	`,
};

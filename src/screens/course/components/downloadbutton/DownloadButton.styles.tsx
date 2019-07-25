import { darken, lighten } from "polished";
import { BaseButton } from "src/components/basebutton/BaseButton";
import { Modal } from "src/components/modal/Modal";
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

	FormField: styled.div`
		margin-right: 20px;
	`,

	FormFieldTitleWrapper: styled.div`
		${p => css`
			flex-direction: row;
			height: ${p.theme.rowHeight}px;
		`};
	`,

	FormFieldTitle: styled.div`
		margin-bottom: 15px;
		align-self: flex-end;
	`,

	FormFieldContent: styled.div`
		${p => css`
			height: ${p.theme.rowHeight}px;
			align-items: center;
			justify-content: center;
		`};
	`,

	FormFieldSelect: styled.select`
		${p => css`
			min-width: 80px;
			height: ${p.theme.rowHeight - 14}px;
			align-items: center;
			flex-direction: row;
		`};
	`,

	FormFieldsContainer: styled.div`
		flex-direction: row;
		flex-wrap: wrap;
		margin-left: 20px;
		margin-right: 30px;
	`,

	SubmitButtonContainer: styled.div`
		${p => css`
			flex-direction: row;
			height: ${p.theme.rowHeight}px;
			justify-content: flex-end;
		`};
	`,

	SubmitButton: styled(BaseButton)`
		${p => css`
			justify-content: center;
			margin: 7px 20px;
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
};

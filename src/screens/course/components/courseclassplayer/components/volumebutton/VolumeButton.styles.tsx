import rgba from "polished/lib/color/rgba";
import { Icon } from "src/components/icon/Icon";
import { Layer } from "src/components/layer/Layer";
import styled, { css } from "styled-components";
import { BaseButton } from "../../../../../../components/basebutton/BaseButton";
import { Mixins } from "../../../../../../style";

export const styles = {
	Button: styled(BaseButton)`
		align-items: center;
		justify-content: center;
		width: ${({ theme }) => theme.baseLineHeight}px;
		height: ${({ theme }) => theme.baseLineHeight}px;

		font-size: 15px;
		font-weight: bold;

		${Mixins.OnHover(css`
			background-color: ${rgba(0, 0, 0, 0.1)};
		`)}
	`,

	Icon: styled(Icon)`
		width: 30px;
		height: 30px;
	`,

	Layer: styled(Layer)``,

	LayerWrapper: styled.div`
		width: ${({ theme }) => theme.rowHeight}px;
		height: ${({ theme }) => theme.rowHeight * 3}px;
		align-items: center;

		background-color: white;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);

		overscroll-behavior: contain;
	`,

	SliderWrapper: styled.div`
		margin-top: 15px;
		margin-bottom: 15px;
		flex: 1;
		width: 10px;
		padding-right: 3px;
		padding-left: 3px;

		cursor: pointer;
	`,

	SliderTrack: styled.div`
		flex: 1;
		width: 4px;

		background-color: rgba(0, 0, 0, 0.15);
	`,

	SliderProgress: styled.div`
		margin-top: auto;
		background-color: ${({ theme }) => theme.accentColor};
		align-items: center;
	`,

	SliderThumbContainer: styled.div`
		height: 0;
		width: 0;
		position: relative;
		align-items: center;
		justify-content: center;
	`,

	SliderThumb: styled.div`
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background-color: ${({ theme }) => theme.accentColor};
	`,
};

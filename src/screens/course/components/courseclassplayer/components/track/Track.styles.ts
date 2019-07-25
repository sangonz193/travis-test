import rgba from "polished/lib/color/rgba";
import { BaseButton } from "src/components/basebutton/BaseButton";
import { Layer } from "src/components/layer/Layer";
import styled, { css } from "styled-components";

export const styles = {
	Wrapper: styled.div`
		height: 50px;
		justify-content: center;
		padding: 0 10px;
	`,

	PointerTracker: styled.div`
		justify-content: center;
		height: 15px;

		cursor: pointer;
	`,

	BackgroundTrack: styled.div`
		position: relative;
		height: 5px;
		flex-direction: row;
		align-items: stretch;

		background-color: ${rgba(0, 0, 0, 0.15)};
	`,

	BufferedTrack: styled.div`
		position: absolute;
		height: 5px;

		background-color: ${rgba(0, 0, 0, 0.2)};
	`,

	ProgressTrack: styled.div`
		position: absolute;
		height: 5px;

		background-color: ${p => p.theme.accentColor};
	`,

	ProgressIndicatorContainer: styled.div`
		align-items: center;
		justify-content: center;
		position: relative;
	`,

	ProgressIndicator: styled.div<{ visible: boolean }>`
		position: absolute;
		background-color: ${p => p.theme.accentColor};
		width: 0;
		height: 0;
		transition: width ease-in 0.1s, height ease-in 0.1s;
		border-radius: 7px;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

		${({ visible }) =>
			visible &&
			css`
				width: 14px;
				height: 14px;
			`};
	`,

	CurrentTrackedTimeLayer: styled(Layer)`
		height: ${p => p.theme.rowHeight / 2}px;
		padding: 0 10px;
		justify-content: center;

		background-color: white;

		box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	`,

	CurrentTrackedTime: styled.span``,

	TimeWrapper: styled.div`
		flex-direction: row;
		justify-content: space-between;
		margin-top: 8px;
	`,

	CurrentTime: styled.span`
		font-size: 12px;
		line-height: normal;
	`,

	Duration: styled(BaseButton)`
		font-size: 12px;
	`,
};

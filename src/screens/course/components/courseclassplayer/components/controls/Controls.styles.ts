import { WiderThan } from "src/style/Mixins";
import styled, { css } from "styled-components";
import { PlaybackRateButton } from "../playbackratebutton/PlaybackRateButton";
import { Track } from "../track/Track";
import { VolumeButton } from "../volumebutton/VolumeButton";

export const styles = {
	Wrapper: styled.div`
		position: relative;
		overflow: hidden;

		pointer-events: none;

		> * {
			pointer-events: auto;
		}
	`,

	BottomControlsContainer: styled.div<{ show: boolean; fullscreen: boolean }>`
		${p => css`
			margin: auto 0 0;

			background-color: rgba(255, 255, 255, 1);
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

			transition: box-shadow ease 0.3s, transform ease 0.3s, opacity ease 0.3s;

			outline: none;

			${!p.show &&
				css`
					box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);
					opacity: 0;
					/* pointer-events: none; */
				`};

			${WiderThan(
				"sm",
				css`
					${!p.fullscreen &&
						css`
							margin: auto 10px 10px;

							${!p.show &&
								css`
									opacity: 0;
								`};
						`};
				`
			)};

			${WiderThan(
				"lg",
				css`
					${!p.fullscreen &&
						css`
							margin: auto 30px 20px;

							${!p.show &&
								css`
									opacity: 0;
								`};
						`};
				`
			)};
		`}
	`,

	Track: styled(Track)``,

	ButtonsContainer: styled.div`
		flex-direction: row;
	`,

	LeftButtonsContainer: styled.div`
		flex: 1;
		flex-direction: row;
	`,

	RightButtonsContainer: styled.div`
		flex-direction: row;
	`,

	PlaybackRateButton: styled(PlaybackRateButton)``,

	VolumeButton: styled(VolumeButton)``,
};

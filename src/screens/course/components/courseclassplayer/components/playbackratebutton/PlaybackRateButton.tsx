import { Overlay } from "src/components/overlay/Overlay";
import React from "react";
import { observer } from "mobx-react-lite";
import { secondsToString } from "openfing-core/lib/helpers";
import { styles } from "./PlaybackRateButton.styles";
import { useCourse } from "src/screens/course/useCourse";

type PlaybackRateButtonProps = {
	className?: string;
};

const playbackRates: number[] = [];

for (let i = 8; i > 0; i--) {
	playbackRates.push(i * 0.25);
}

export const PlaybackRateButton: React.FunctionComponent<PlaybackRateButtonProps> = observer(({ className }) => {
	const { courseClassPlayerController } = useCourse();
	const { playbackRate } = courseClassPlayerController;
	const [overlayCoordinates, setOverlayCoordinates] = React.useState<{ top: number; left: number }>();

	React.useEffect(() => {
		const blockControlsId = "playback-rate";

		if (overlayCoordinates) courseClassPlayerController.addBlockControls(blockControlsId);
		else courseClassPlayerController.removeBlockControls(blockControlsId);
	}, [!overlayCoordinates]);

	return (
		<>
			<styles.Button
				className={className}
				onClick={e => {
					const { top, left, width } = e.currentTarget.getBoundingClientRect();
					setOverlayCoordinates({
						top,
						left: left + width / 2,
					});
				}}
			>
				{Math.floor(playbackRate) === playbackRate ? playbackRate + ".0" : playbackRate}x
			</styles.Button>

			{overlayCoordinates && (
				<Overlay
					isVisible={true}
					top={overlayCoordinates.top}
					left={overlayCoordinates.left}
					onDismiss={() => setOverlayCoordinates(undefined)}
				>
					<styles.PlaybackRateList>
						{playbackRates.map((playbackRate, index) => (
							<styles.PlaybackRateItem
								key={playbackRate}
								autoFocus={index === 0}
								active={courseClassPlayerController.playbackRate === playbackRate}
								onClick={() => {
									courseClassPlayerController.setPlaybackRate(playbackRate);
									setOverlayCoordinates(undefined);
								}}
							>
								<span
									style={{
										display: "block",
										textAlign: "left",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									<strong style={{ display: "inline", fontWeight: "bold" }}>
										{Math.floor(playbackRate) === playbackRate ? playbackRate + ".0" : playbackRate}
										x
									</strong>

									{courseClassPlayerController.duration &&
										` (${secondsToString(courseClassPlayerController.duration / playbackRate)})`}
								</span>
							</styles.PlaybackRateItem>
						))}
					</styles.PlaybackRateList>
				</Overlay>
			)}
		</>
	);
});

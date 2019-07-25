import { observer } from "mobx-react-lite";
import React from "react";
import { createPortal } from "react-dom";
import { useLayer } from "src/hooks/useLayer";
import { styles } from "./Layer.styles";

export type LayerPosition =
	| {
			top: number;
			left: number;
	  }
	| {
			top: number;
			right: number;
	  }
	| {
			bottom: number;
			left: number;
	  }
	| {
			bottom: number;
			right: number;
	  };

export type LayerProps = {
	calculatePosition: (layersWrapper: HTMLDivElement, layer: HTMLDivElement) => LayerPosition;
	updatePosition?: React.MutableRefObject<(() => boolean) | null>;

	onFocus?: React.FocusEventHandler<HTMLDivElement>;
	onBlur?: React.FocusEventHandler<HTMLDivElement>;
	onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
	onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

	className?: string;
	style?: React.CSSProperties;
};

export const Layer: React.FunctionComponent<LayerProps> = observer(props => {
	const [shouldRender, setShouldRender] = React.useState(false);
	const [coordinates, setCoordinates] = React.useState<LayerPosition>({ left: 0, top: 0 });

	const layerRef = React.useRef<HTMLDivElement>(null);
	const { containerRef: layersWrapper } = useLayer();

	const updatePosition = (): boolean => {
		if (!layersWrapper.current || !layerRef.current) return false;

		const position = props.calculatePosition(layersWrapper.current, layerRef.current);

		setCoordinates(position);
		setShouldRender(true);
		return true;
	};

	React.useEffect(() => {
		if (props.updatePosition) props.updatePosition.current = updatePosition;

		if (shouldRender) return;

		updatePosition();
	});

	React.useEffect(() => {
		const handleFullscreenChange = () => {
			setTimeout(() => updatePosition(), 100);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);

		return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
	}, []);

	const style: React.CSSProperties = {
		opacity: shouldRender ? 1 : 0,
		...coordinates,
		...props.style,
	};

	return (
		layersWrapper.current &&
		createPortal(
			<styles.Container
				ref={layerRef}
				className={props.className}
				style={style}
				onFocus={props.onFocus}
				onBlur={props.onBlur}
				onMouseEnter={props.onMouseEnter}
				onMouseLeave={props.onMouseLeave}
			>
				{props.children}
			</styles.Container>,
			layersWrapper.current
		)
	);
});

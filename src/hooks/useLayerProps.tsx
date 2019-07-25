import React, { DependencyList, HTMLAttributes, useContext } from "react";
import { AppStoreContext } from "src/components/AppStoreContext";
import { LayerPosition, LayerProps } from "src/components/layer/Layer";
import { useFocus } from "./useFocus";

export type UseLayerPropsOptions<T extends HTMLElement> = {
	position: "top";
	separation?: number;

	behaviour: "hover" | "press";
	triggerRef: React.RefObject<T | undefined | null>;
	updatePosition?: LayerProps["updatePosition"];
};

export type UseLayerPropsOutput<TTrigger extends HTMLElement> = [boolean, LayerProps, HTMLAttributes<TTrigger>];

export const useLayerProps = <TTrigger extends HTMLElement>(
	options: UseLayerPropsOptions<TTrigger>,
	deps: DependencyList
): UseLayerPropsOutput<TTrigger> => {
	const { inputType } = useContext(AppStoreContext);

	const [shouldRender, setShouldRender] = React.useState(false);

	const isTriggerFocusedRef = React.useRef(false);
	const isTriggerHoveredRef = React.useRef(false);
	const isLayerFocusedRef = React.useRef(false);
	const isLayerHoveredRef = React.useRef(false);

	const updateShouldRenderTimeoutRef = React.useRef<number>();
	const updateShouldRender = React.useCallback(() => {
		clearTimeout(updateShouldRenderTimeoutRef.current);
		const nextShouldRender =
			options.behaviour === "hover" && inputType === "pointer"
				? isTriggerHoveredRef.current || isLayerHoveredRef.current || isLayerFocusedRef.current
				: isTriggerFocusedRef.current || isLayerFocusedRef.current;

		if (shouldRender === nextShouldRender) return;

		if (nextShouldRender) setShouldRender(true);
		else updateShouldRenderTimeoutRef.current = setTimeout(() => setShouldRender(false), 300);
	}, [shouldRender, inputType]);

	// Trigger
	const handleTriggerFocusChange = (isFocused: boolean) => {
		isTriggerFocusedRef.current = isFocused;
		updateShouldRender();
	};
	const triggerFocusHandler = useFocus(
		{
			onFocus: () => handleTriggerFocusChange(true),
			onBlur: () => handleTriggerFocusChange(false),
		},
		[updateShouldRender]
	);
	const triggerProps = React.useMemo<HTMLAttributes<TTrigger>>(() => {
		const handleTriggerHoverChange = async (isHovered: boolean) => {
			isTriggerHoveredRef.current = isHovered;
			updateShouldRender();
		};

		return {
			onMouseEnter: () => handleTriggerHoverChange(true),
			onMouseLeave: () => handleTriggerHoverChange(false),
			onFocus: triggerFocusHandler.handleFocus,
			onBlur: triggerFocusHandler.handleBlur,
		};
	}, [updateShouldRender]);

	// Layer
	const handleLayerFocusChange = (isFocused: boolean) => {
		isLayerFocusedRef.current = isFocused;
		updateShouldRender();
	};
	const handleLayerHoverChange = (isFocused: boolean) => {
		isLayerHoveredRef.current = isFocused;
		updateShouldRender();
	};
	const layerFocusHandler = useFocus(
		{
			onFocus: () => handleLayerFocusChange(true),
			onBlur: () => handleLayerFocusChange(false),
		},
		[updateShouldRender]
	);
	const layerProps = React.useMemo<LayerProps>(() => {
		return {
			updatePosition: options.updatePosition,
			calculatePosition: (layersWrapper, layer) => {
				const { triggerRef } = options;

				let result: LayerPosition = {
					top: 0,
					left: 0,
				};

				if (triggerRef.current) {
					const triggerBounds = triggerRef.current.getBoundingClientRect();
					const layersWrapperBounds = layersWrapper.getBoundingClientRect();
					const layerBounds = layer.getBoundingClientRect();

					if (options.position === "top") {
						const top = Math.max(0, triggerBounds.top - layerBounds.height - (options.separation || 0));

						const triggerXCenterLeft = triggerBounds.left + triggerBounds.width / 2;
						const triggerXCenterRight = layersWrapperBounds.width - triggerXCenterLeft;

						if (triggerXCenterLeft > layersWrapperBounds.width / 2)
							result = {
								top,
								right: Math.max(0, triggerXCenterRight - layerBounds.width / 2),
							};
						else
							result = {
								top,
								left: Math.max(0, triggerXCenterLeft - layerBounds.width / 2),
							};
					}
				}

				return result;
			},
			onFocus: layerFocusHandler.handleFocus,
			onBlur: layerFocusHandler.handleBlur,
			onMouseEnter: () => handleLayerHoverChange(true),
			onMouseLeave: () => handleLayerHoverChange(false),
		};
	}, [options.updatePosition, shouldRender, ...deps]);

	return [shouldRender, layerProps, triggerProps];
};

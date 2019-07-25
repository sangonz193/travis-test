import React from "react";

// Context
export type LayerContext = {
	containerRef: React.RefObject<HTMLDivElement>;
};

const context = React.createContext<LayerContext>(undefined as any);

// Provider
export type LayerProviderProps = LayerContext;

export const LayerProvider: React.FunctionComponent<LayerProviderProps> = props => (
	<context.Provider value={props}>{props.children}</context.Provider>
);

// Hook
export type UseLayerOutput = LayerContext;

export const useLayer: () => UseLayerOutput = () => React.useContext(context);

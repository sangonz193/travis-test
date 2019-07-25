import React from "react";

export type SetState<T> = (state: Partial<T> | ((prevState: T) => Partial<T> | null)) => void;

export const useSetState = <T>(initialState: T): UseSetStateOutput<T> => {
	const [state, setState] = React.useState<T>(initialState);

	const stateRef = React.useRef(state);
	stateRef.current = state;

	const dispatch = React.useCallback<SetState<T>>(state => {
		const partialState = typeof state === "function" ? state(stateRef.current) : state;

		if (!partialState || Object.keys(partialState).length === 0) return;

		const newState = {
			...stateRef.current,
			...partialState,
		};

		setState(newState);
	}, []);

	return [state, dispatch];
};

export type UseSetStateOutput<T> = [T, SetState<T>];

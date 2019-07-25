import { observable } from "mobx";
import React, { useEffect } from "react";
import { useFocus } from "src/hooks";

type UseTrapFocusContextValue = {
	registerTrap: (ref: React.MutableRefObject<{ requestFocus: () => void; autoFocus: boolean }>) => string;
	unregisterTrap: (id: string) => void;
	currentValue: string | undefined;
};

const UseTrapFocusContext = React.createContext<UseTrapFocusContextValue>(null as any);

type UseTrapFocusProviderStateItem = {
	id: string;
	ref: React.MutableRefObject<{ requestFocus: () => void; autoFocus: boolean }>;
};
export const UseTrapFocusProvider: React.FunctionComponent = props => {
	const [value, setValue] = React.useState<UseTrapFocusProviderStateItem[]>([]);

	const focusQueueRef = React.useRef(
		observable<UseTrapFocusContextValue>({
			registerTrap: ref => {
				const id = uuid();
				const newItem: UseTrapFocusProviderStateItem = {
					id,
					ref,
				};

				setValue(value => [...value, newItem]);

				return id;
			},
			unregisterTrap: id => {
				setValue(value => {
					const index = value.findIndex(i => i.id === id);

					if (index > 0) return [...value.splice(index, 1)];

					return value;
				});
			},
			currentValue: value.length > 0 ? value[value.length - 1].id : undefined,
		})
	);

	return <UseTrapFocusContext.Provider value={focusQueueRef.current}>{props.children}</UseTrapFocusContext.Provider>;
};

// TODO: use
export const useTrapFocus = (requestFocus: () => void, autoFocus: boolean = true) => {
	const { registerTrap, unregisterTrap, currentValue } = React.useContext(UseTrapFocusContext);
	const isFocusedRef = React.useRef(autoFocus);
	const idRef = React.useRef<string>();

	const registerTrapRef = React.useRef<{ requestFocus: () => void; autoFocus: boolean }>({
		requestFocus: () => {
			if (!isFocusedRef.current) requestFocus();
		},
		autoFocus,
	});

	useEffect(() => {
		const id = registerTrap(registerTrapRef);

		return () => unregisterTrap(id);
	}, []);

	useEffect(() => {
		registerTrapRef.current.requestFocus = requestFocus;
		registerTrapRef.current.autoFocus = autoFocus;
	}, [requestFocus, autoFocus]);

	const { handleFocus, handleBlur } = useFocus(
		{
			onFocus: () => {
				isFocusedRef.current = true;
			},
			onBlur: () => {
				isFocusedRef.current = false;

				setTimeout(() => {
					if (!isFocusedRef.current && idRef.current === currentValue) requestFocus();
				}, 0);
			},
		},
		[currentValue]
	);

	return { handleFocus, handleBlur };
};

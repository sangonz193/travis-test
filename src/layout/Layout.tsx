import React, { Reducer, useCallback, useMemo, useReducer, useRef } from "react";

import { HeaderProps } from "../components/header/Header";
import { observer } from "mobx-react-lite";
import { styles } from "./Layout.styles";

export type LayoutOptions = {
	header: HeaderProps & {
		hide: boolean;
	};
};

export type SetLayoutOptions = (
	options:
		| RecursivePartial<LayoutOptions>
		| ((options: RecursivePartial<LayoutOptions>) => RecursivePartial<LayoutOptions>)
) => void;
export const LayoutContext = React.createContext<SetLayoutOptions>(undefined as any);

export type LayoutProps = {
	routeKey: string;
	layoutOptions?: RecursivePartial<LayoutOptions>;
};

type OptionsReducerAction =
	| {
			type: "reset";
	  }
	| {
			type: "update";
			newOptions: RecursivePartial<LayoutOptions>;
	  };

export const mergeLayoutOptions = (
	...options: Array<RecursivePartial<LayoutOptions>>
): RecursivePartial<LayoutOptions> => {
	if (options.length < 2) return options[0] || {};

	const firstItem = options[0];
	options.shift();

	return options.reduce<RecursivePartial<LayoutOptions>>((previousValue, currentValue) => {
		currentValue = { ...currentValue };
		const updatedOptions = { ...previousValue };

		if (updatedOptions.header !== currentValue.header)
			updatedOptions.header = {
				...updatedOptions.header,
				...currentValue.header,
			};

		return updatedOptions;
	}, firstItem);
};

const defaultLayoutOptions: RecursivePartial<LayoutOptions> = {};
const optionsReducer: Reducer<RecursivePartial<LayoutOptions>, OptionsReducerAction> = (prevState, action) => {
	if (action.type === "reset") return { ...defaultLayoutOptions, header: { ...defaultLayoutOptions.header } };

	return mergeLayoutOptions(prevState, action.newOptions);
};

export const Layout: React.FunctionComponent<LayoutProps> = observer(props => {
	const [options, dispatchOptions] = useReducer(optionsReducer, defaultLayoutOptions);
	const routeKeyRef = useRef<string>();
	const mergedOptions = useMemo(() => {
		const optionsSource = [defaultLayoutOptions];

		if (props.layoutOptions) optionsSource.push(props.layoutOptions);

		if (routeKeyRef.current === props.routeKey) optionsSource.push(options);
		else {
			dispatchOptions({ type: "reset" });
			routeKeyRef.current = props.routeKey;
		}

		return mergeLayoutOptions(...optionsSource);
	}, [options, props.layoutOptions, props.routeKey]);
	const mergedOptionsRef = useRef<RecursivePartial<LayoutOptions>>(mergedOptions);
	mergedOptionsRef.current = mergedOptions;

	const setLayoutOptions = useCallback<SetLayoutOptions>(newOptions => {
		dispatchOptions({
			type: "update",
			newOptions: typeof newOptions === "function" ? newOptions(mergedOptionsRef.current) : newOptions,
		});
	}, []);

	return (
		<LayoutContext.Provider value={setLayoutOptions}>
			<styles.Wrapper>
				<styles.ContentContainer>
					{props.children}

					{mergedOptions.header && mergedOptions.header.hide ? null : (
						<styles.Header
							title={mergedOptions.header && mergedOptions.header.title}
							showBackButton={(mergedOptions.header && mergedOptions.header.showBackButton) || false}
							right={mergedOptions.header && mergedOptions.header.right}
						/>
					)}
				</styles.ContentContainer>

				<styles.NavBar />
			</styles.Wrapper>
		</LayoutContext.Provider>
	);
});

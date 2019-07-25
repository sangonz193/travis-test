import { History } from "history";
import React from "react";

type HistoryContextValue = {
	history: History;
	baseURL: string;
};
const HistoryContext = React.createContext<HistoryContextValue>(undefined as any);

export type HistoryProviderProps = {
	history: History;
};
export const HistoryProvider: React.FunctionComponent<HistoryProviderProps> = ({ children, history }) => {
	const { origin, protocol, hostname, port } = window.location;

	const baseURL = React.useMemo<string>(() => {
		const { PUBLIC_URL } = process.env;

		return origin
			? origin + (PUBLIC_URL ? "/" + PUBLIC_URL : "")
			: protocol + "//" + hostname + (port ? ":" + port : "") + (PUBLIC_URL ? "/" + PUBLIC_URL : "");
	}, [origin, protocol, hostname, port]);

	const value = React.useRef({
		history,
		baseURL,
	});

	return <HistoryContext.Provider value={value.current}>{children}</HistoryContext.Provider>;
};

export type UseHistoryOutput = {
	history: History;
	baseURL: string;
};

export const useHistory: () => UseHistoryOutput = () => {
	const { history, baseURL } = React.useContext(HistoryContext);

	return {
		history,
		baseURL,
	};
};

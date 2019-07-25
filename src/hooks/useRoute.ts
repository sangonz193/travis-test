import { DependencyList, useMemo } from "react";
import { useHistory } from "src/hooks/useHistory";

export type UseRouteURLOptions = {
	url: string;
	useBaseURL?: boolean;
};

export const useRouteURL = (
	getURL: () => string | UseRouteURLOptions,
	deps: DependencyList
): [string, () => string] => {
	const { baseURL } = useHistory();

	return useMemo<[string, () => string]>(() => {
		const getPath = () => {
			const response = getURL();
			let o: UseRouteURLOptions =
				typeof response === "string"
					? {
							url: response,
					  }
					: response;

			let result = o.url;
			if (o.useBaseURL) result = `${baseURL}${result}`;

			return result;
		};

		return [getPath(), getPath];
	}, [...deps, baseURL]);
};

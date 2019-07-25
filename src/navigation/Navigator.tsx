import { History, Location } from "history";
import { Layout, LayoutOptions } from "../layout/Layout";
import { PathMatch, matchPath } from "../components/useMatchPath";
import { Reducer, useCallback, useEffect, useReducer } from "react";

import React from "react";

export type NavigationComponentProps<TParams = {}> = {
	match: PathMatch<TParams>;
};

export const NavigatorContext = React.createContext<(path: string, state: any) => void>(undefined as any);

export type NavigationRoute = {
	component: React.ComponentType<NavigationComponentProps<any>>;
	path: string | string[];
	routeKey: string;

	exact?: boolean;
	layoutOptions?: RecursivePartial<LayoutOptions>;
};

export type NavigatorProps = {
	history: History;
	routes: NavigationRoute[];
};

const matchRouteByPath = (
	path: string,
	routes: NavigationRoute[]
): { route: NavigationRoute; match: PathMatch } | { route: null; match: null } => {
	for (const route of routes) {
		const pathsToTest = typeof route.path === "string" ? [route.path] : route.path;
		let match: PathMatch | null;

		for (const pathToTest of pathsToTest) {
			match = matchPath(path, { exact: route.exact, path: pathToTest });

			if (match) return { route, match };
		}
	}

	return {
		route: null,
		match: null,
	};
};

const reducer: Reducer<
	{
		location: {
			pathname: string;
			search: string;
			hash: string;
			state: any;
			key?: string;
		};
	} & (
		| {
				match: PathMatch;
				route: NavigationRoute;
		  }
		| {
				match: null;
				route: null;
		  }),
	{ location: Location; routes: NavigationRoute[] }
> = (prevState, { location, routes }) => ({
	...matchRouteByPath(location.pathname, routes),
	location,
});

export const Navigator: React.FunctionComponent<NavigatorProps> = props => {
	const { location } = props.history;

	const [state, dispatch] = useReducer<typeof reducer, undefined>(reducer, undefined, () => ({
		...matchRouteByPath(location.pathname, props.routes),
		location,
	}));
	const { route } = state;

	useEffect(
		() =>
			props.history.listen(location => {
				dispatch({
					location,
					routes: props.routes,
				});
			}),
		[props.history]
	);

	const navigateTo = useCallback<(path: string, state: any) => void>((path, state) => {
		props.history.push(path, state);
	}, []);

	return (
		<NavigatorContext.Provider value={navigateTo}>
			<Layout
				routeKey={
					route
						? route.routeKey
							? route.routeKey
							: typeof route.path === "string"
							? route.path
							: route.path.join("-")
						: ""
				}
				layoutOptions={route ? route.layoutOptions : undefined}
			>
				{state.route && <state.route.component match={state.match} />}
			</Layout>
		</NavigatorContext.Provider>
	);
};

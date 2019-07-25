import * as Screens from "./screens";

import { NavigationComponentProps, NavigationRoute, Navigator } from "./navigation/Navigator";
import styled, { ThemeProvider } from "styled-components";

import { ApolloProvider } from "react-apollo-hooks";
import { AppStore } from "./appstore";
import { AppStoreContext } from "./components/AppStoreContext";
import { BreakpointManager } from "./components/BreakpointManager";
import { InputTypeManager } from "./components/InputTypeManager";
import { LayerProvider } from "./hooks/useLayer";
import { OverlayContainerContext } from "src/context/OverlayContainer";
import React from "react";
import { RootStore } from "openfing-core";
import { RootStoreProvider } from "openfing-core/lib/hooks/useRootStore";
import { UseTrapFocusProvider } from "./hooks/useTrapFocus";
import { getClient } from "openfing-core/lib/api";
import { getCoursePath } from "src/routes";
import { runInAction } from "mobx";
import { theme } from "./style/Theme";
import { useFocus } from "./hooks";
import { useHistory } from "./hooks/useHistory";
import { useRouteURL } from "src/hooks/useRoute";

const routes: NavigationRoute[] = [
	{
		path: "/courses/:cc/:ccn",
		component: (props: NavigationComponentProps<{ cc: string; ccn: string }>) => {
			const { cc, ccn } = props.match.params;
			const { history } = useHistory();
			const courseClassNumber = Number(ccn);

			const [, getCourseURL] = useRouteURL(
				() =>
					getCoursePath({
						courseClassNumber: Number.isNaN(courseClassNumber) ? undefined : courseClassNumber,
						courseCode: cc,
					}),
				[]
			);

			React.useEffect(() => {
				setTimeout(() => history.replace(getCourseURL()), 100);
			}, []);

			return null;
		},
		routeKey: "CourseLegacy",
	},
	{
		component: Screens.Course,
		path: "/courses/:courseCode",
		routeKey: "Course",
	},
	{
		component: Screens.Courses,
		path: "/courses",
		exact: false,
		routeKey: "Courses",
	},
	{
		component: Screens.Updates,
		path: "/updates",
		routeKey: "Updates",
	},
	{
		component: Screens.FAQs,
		path: "/faqs",
		routeKey: "FAQs",
	},
	{
		component: Screens.Home,
		path: "/",
		layoutOptions: {
			header: {
				hide: true,
			},
		},
		routeKey: "Home",
	},
];

const Wrapper = styled.div`
	flex: 1;
`;

const OverlayContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	pointer-events: none;
	z-index: 1;
`;

export const App: React.FunctionComponent = () => {
	const { history } = useHistory();
	const rootStore = React.useRef(new RootStore());
	const appStore = React.useRef(new AppStore());
	const overlayContainerRef = React.useRef<HTMLDivElement>(null);

	const { handleFocus, handleBlur } = useFocus(
		{
			onFocus: () => {
				runInAction(() => (appStore.current.isFocused = true));
			},
			onBlur: () => {
				runInAction(() => (appStore.current.isFocused = false));
			},
		},
		[]
	);

	const content = (
		<>
			<InputTypeManager />
			<BreakpointManager />

			<Navigator history={history} routes={routes} />
			<OverlayContainer ref={overlayContainerRef} />
		</>
	);

	return (
		<ApolloProvider client={getClient()}>
			<Wrapper onFocus={handleFocus} onBlur={handleBlur}>
				<UseTrapFocusProvider>
					<RootStoreProvider rootStore={rootStore.current}>
						<OverlayContainerContext.Provider value={overlayContainerRef}>
							<AppStoreContext.Provider value={appStore.current}>
								<LayerProvider containerRef={overlayContainerRef}>
									<ThemeProvider theme={theme}>{content}</ThemeProvider>
								</LayerProvider>
							</AppStoreContext.Provider>
						</OverlayContainerContext.Provider>
					</RootStoreProvider>
				</UseTrapFocusProvider>
			</Wrapper>
		</ApolloProvider>
	);
};

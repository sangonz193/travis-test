import React from "react";

import { addDecorator, configure } from "@storybook/react";
import styled, { ThemeProvider } from "styled-components";

import { AppStore } from "../src/appstore";
import { AppStoreContext } from "../src/components/AppStoreContext";
import { BreakpointManager } from "../src/components/BreakpointManager";
import { GlobalStyle } from "../src/style/GlobalStyle";
import { InputTypeManager } from "../src/components/InputTypeManager";
import { LayerProvider } from "../src/hooks/useLayer";
import { Provider } from "openfing-core/lib/hooks/useRootStore";
import { RootStore } from "openfing-core";
import { theme } from "../src/style/Theme";

const req = require.context("../src", true, /.stories.tsx?/);

configure(() => {
	req.keys().forEach(filename => req(filename));

	addDecorator(s => (
		<>
			<GlobalStyle />

			{s()}
		</>
	));
	addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

	const LayerContainer = styled.div`
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		pointer-events: none;

		> * {
			pointer-events: auto;
		}
	`;

	const LayerDecorator = ({ story }) => {
		const layerContainerRef = React.useRef();

		return (
			<LayerProvider containerRef={layerContainerRef}>
				<div style={{ position: "relative", flex: 1 }}>
					{story()}

					<LayerContainer ref={layerContainerRef} />
				</div>
			</LayerProvider>
		);
	};

	addDecorator(story => <Provider value={new RootStore()}>{story()}</Provider>);
	addDecorator(story => <LayerDecorator story={story} />);
	addDecorator(story => (
		<AppStoreContext.Provider value={new AppStore()}>
			<BreakpointManager />
			<InputTypeManager />

			{story()}
		</AppStoreContext.Provider>
	));
}, module);

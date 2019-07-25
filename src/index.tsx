import "whatwg-fetch";
import "fullscreen-api-polyfill";

import * as uuid from "uuid/v4";

import { App } from "./App";
import { GlobalStyle } from "./style/GlobalStyle";
import { HistoryProvider } from "src/hooks/useHistory";
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { initializeClient } from "openfing-core/lib/api";
import { observable } from "mobx";

(global as any).uuid = uuid;

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL });
const observableHistory = observable(history);
const wrapper = document.getElementById("root");

history.listen(location1 => (observableHistory.location = location1));

initializeClient({ uri: process.env.API_CLIENT_URI! });

ReactDOM.render(
	<>
		<GlobalStyle />

		<HistoryProvider history={observableHistory}>
			<App />
		</HistoryProvider>
	</>,
	wrapper
);

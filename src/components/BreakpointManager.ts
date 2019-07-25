import { useContext, useEffect } from "react";

import { AppStoreContext } from "./AppStoreContext";
import { getBreakpointForWidth } from "src/helper";

export const BreakpointManager = () => {
	const appStore = useContext(AppStoreContext);

	useEffect(() => {
		const handleResize = () => {
			const { innerWidth } = window;

			appStore.setBreakpoint(getBreakpointForWidth(innerWidth));
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [appStore]);

	return null;
};

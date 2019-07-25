import "styled-components";

declare module "styled-components" {
	import { ThemeInterface } from "../style/ThemeInterface";

	export type DefaultTheme = ThemeInterface;
}

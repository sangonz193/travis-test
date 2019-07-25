import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
	* {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

	head, title, link, meta, style, script {
		display: none;
	}
	
	html > body {
		flex-grow: 1;
		overscroll-behavior: contain;
	}

	html, body, div, span, applet, object, iframe,
	h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	a, abbr, acronym, address, big, cite, code,
	del, dfn, em, img, ins, kbd, q, s, samp,
	small, strike, strong, sub, sup, tt, var,
	b, u, i, center,
	dl, dt, dd, ol, ul, li,
	fieldset, form, label, legend,
	table, caption, tbody, tfoot, thead, tr, th, td,
	article, aside, canvas, details, embed, 
	figure, figcaption, footer, header, hgroup, 
	menu, nav, output, ruby, section, summary,
	time, mark, audio, video, svg {
		margin: 0;
		display: flex;
		flex-shrink: 0;
		flex-grow: 0;
		flex-direction: column;
		min-height: 0;
		min-width: 0;
		padding: 0;
		
		border: 0;
		
		font-size: 100%;
		font: inherit;

		vertical-align: baseline;
		box-sizing: border-box;
	}
	
	html {
		height: 100%;
	}
	
	a {
		&, &:hover, &:active, &:visited, &:focus, &:hover {
				color: inherit;
				text-decoration: none;
 		}
	}

	article, aside, details, figcaption, figure, 
	footer, header, hgroup, menu, nav, section,div, * {
		display: flex;
		flex-shrink: 0;
		flex-grow: 0;
		flex-direction: column;
		min-height: 0;
		min-width: 0;
	
		box-sizing: border-box;
	}
	
	body {
		line-height: 1;
		font-family: sans-serif;
		flex: 0 0 100%;
	}
	
	ol, ul {
		list-style: none;
	}
	
	blockquote, q {
		quotes: none;
	}
	
	blockquote:before, blockquote:after,
	q:before, q:after {
		content: '';
		content: none;
	}
	
	#root {
		flex: 0 0 100%;
	}
	
	div {
	outline: none;
	}
`;

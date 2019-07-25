import { FlattenSimpleInterpolation, css } from "styled-components";

import { Breakpoint } from "./Breakpoint";
import darken from "polished/lib/color/darken";

export const EllipsisText = (maxHeight?: string) => css`
	overflow: hidden;
	${maxHeight &&
		css`
			max-height: ${maxHeight};
		`};
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: normal;
`;

export const OnHover = (inter: FlattenSimpleInterpolation): FlattenSimpleInterpolation => css`
	.pointer &:hover {
		${inter};
	}
`;

export const WiderThan = (
	bp: number | keyof typeof Breakpoint,
	inter: FlattenSimpleInterpolation
): FlattenSimpleInterpolation => css`
	@media (min-width: ${typeof bp === "string" ? Breakpoint[bp] : bp}px) {
		${inter};
	}
`;

export const NarrowerThan = (bp: number, inter: FlattenSimpleInterpolation): FlattenSimpleInterpolation => css`
	@media (max-width: ${bp}px) {
		${inter};
	}
`;

export const HSpacing = (spacing: number) => css`
	> :not(:last-child) {
		margin-right: ${spacing}px;
	}
`;

export const VSpacing = (spacing: number) => css`
	> :not(:last-child) {
		margin-bottom: ${spacing}px;
	}
`;

export const List = css`
	display: flex;
	flex-direction: column;
	min-height: 0;
	min-width: 0;
	width: auto;
	overflow: auto;
	box-sizing: border-box;

	> * {
		flex-shrink: 0;
	}
`;

export const ResponsiveList = css`
	${List};

	${WiderThan(
		Breakpoint.sm,
		css`
			align-items: center;

			> * {
				width: 80%;
				max-width: 800px;
				box-sizing: border-box;

				&:not(:last-child) {
					margin-bottom: 20px;
				}
			}
		`
	)};
`;

export const ListItem = css`
	flex: 0 0 ${p => p.theme.baseLineHeight}px;

	${OnHover(css`
		background-color: ${darken(0.1, "#eee")};
	`)};

	padding-right: 20px;
	padding-left: 20px;
`;

export const ResponsiveListItem = css`
	${ListItem};

	${WiderThan(
		Breakpoint.sm,
		css`
			flex-basis: auto;
			padding: 20px 15px;
			border: 1px rgba(67, 52, 52, 0.2) solid;
			background-color: #fafafa;

			&:before,
			&:after {
				content: none;
			}
		`
	)};
`;

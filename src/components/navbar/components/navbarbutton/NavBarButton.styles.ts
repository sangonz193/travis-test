import styled, { css } from "styled-components";
import { Breakpoint, Mixins } from "../../../../style";
import { Icon } from "../../../icon/Icon";
import { Link } from "../../../link/Link";

export const styles = {
	Wrapper: styled(Link)<{ isActive: boolean }>`
		${p => css`
			justify-content: center;
			align-items: center;

			${Mixins.WiderThan(
				Breakpoint.md,
				css`
					${p.isActive &&
						css`
							background-image: ${p.theme.accentColorGradient};

							box-shadow: 0 0 3px rgba(67, 52, 52, 0.4);
							z-index: 1;
						`};
				`
			)}
		`};
	`,

	Icon: styled(Icon)<{ isActive: boolean }>`
		${p => css`
			height: 25px;
			width: 25px;

			${p.isActive &&
				css`
					fill: ${p.theme.accentColor};
				`}

			${Mixins.WiderThan(
				Breakpoint.md,
				css`
					${p.isActive &&
						css`
							height: 25px;
							width: 25px;
							fill: white;
						`}
				`
			)}
		`}
	`,

	Label: styled.span<{ isActive: boolean }>`
		${p => css`
			font-size: 12px;
			margin-top: 3px;
			padding: 0 3px;

			${p.isActive &&
				css`
					color: ${p.theme.accentColor};
				`};

			${Mixins.WiderThan(
				Breakpoint.md,
				css`
					font-size: 8px;

					${p.isActive &&
						css`
							color: white;
						`}
				`
			)};

			${Mixins.EllipsisText()};
			max-width: 100%;
		`}
	`,
};

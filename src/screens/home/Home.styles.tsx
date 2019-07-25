import { Breakpoint, Mixins } from "../../style";
import styled, { css } from "styled-components";

import ipamBackground from "../../assets/images/IPAM.jpg";
import logo from "../../assets/images/Logo.svg";
import logoText from "../../assets/images/LogoTexto.svg";

export const styles = {
	Wrapper: styled.div`
		position: relative;
		flex: 1 1 100%;
	`,
	BackgroundContainer: styled.div`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	`,
	BackgroundImage: styled.div<{ mounted: boolean }>`
		${p => css`
			${p.mounted &&
				css`
					background: url(${ipamBackground}) center no-repeat;
				`};
			background-size: cover;
			flex: 1;
		`}
	`,
	BackgroundFilter: styled.div`
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-image: ${p => p.theme.accentColorGradient};
		opacity: 0.2;
	`,
	ContentWrapper: styled.div`
		flex: 1 1 100%;
		flex-direction: column;
		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				overflow: auto;
			`
		)};
	`,
	TopContentContainer: styled.div`
		flex-direction: column;
		overflow: auto;
		flex: 1 1 auto;
		margin-bottom: 0;

		${Mixins.WiderThan(
			Breakpoint.md,
			css`
				flex-shrink: 0;
			`
		)};
	`,
	LogoContainer: styled.div`
		position: relative;
		flex-direction: column;
		align-self: stretch;
		flex-shrink: 0;

		padding-top: 100px;
		padding-left: 100px;

		margin-bottom: 15px;

		${Mixins.NarrowerThan(
			Breakpoint.sm,
			css`
				padding-top: 20px;
				padding-left: 20px;
				padding-right: 20px;
			`
		)};
	`,
	OpenFINGLogo: styled.img.attrs({
		src: logo,
	})`
		margin-left: -15px;
		margin-bottom: 10px;
		height: 150px;
		width: 150px;
	`,
	LogoText: styled.img.attrs({
		src: logoText,
	})`
		max-width: 400px;
	`,
	CaptionsWrapper: styled.div`
		position: relative;
		flex-shrink: 0;

		padding-left: 100px;

		${Mixins.NarrowerThan(
			Breakpoint.sm,
			css`
				padding-left: 20px;
				padding-right: 20px;
			`
		)};
	`,
	Caption: styled.span`
		text-align: left;
		color: white;
		opacity: 1;
		font-size: 50px;
		text-transform: uppercase;
		font-weight: bold;
		margin-bottom: 5px;
	`,
	SecondCaption: styled.span`
		text-align: left;
		color: white;
		opacity: 0.8;
		font-size: 24px;
		text-transform: uppercase;
		margin-bottom: 100px;
	`,
};

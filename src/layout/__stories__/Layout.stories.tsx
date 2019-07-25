import { Layout, LayoutContext } from "../Layout";
import { useContext, useEffect } from "react";

import { BaseButton } from "../../components/basebutton/BaseButton";
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Wrapper = styled.div`
	flex: 1;
	height: 100%;
	width: 100%;
`;

const Content = styled.div`
	flex: 1;
`;

const LayoutController = () => {
	const setLayoutOptions = useContext(LayoutContext);

	useEffect(() => {
		setLayoutOptions({
			header: {
				title: "TITLE",
			},
		});
	}, []);

	return (
		<BaseButton onClick={() => setLayoutOptions(({ header = {} }) => ({ header: { hide: !header.hide } }))}>
			Hide NavBar
		</BaseButton>
	);
};

storiesOf("Layout", module).add("Default", () => (
	<Wrapper>
		<Layout routeKey="">
			<Content>
				<LayoutController />
			</Content>
		</Layout>
	</Wrapper>
));

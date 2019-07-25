import { boolean, text } from "@storybook/addon-knobs";

import { Header } from "../Header";
import React from "react";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Container = styled.div`
	height: 50px;
	flex-direction: row;
	width: 100%;
	box-shadow: 0 0 5px #ddd;
`;

const Default = () => {
	const showBackButton = boolean("show back button", true);
	const title = text("title", "Default story");

	return (
		<Container>
			<Header showBackButton={showBackButton} title={title} />
		</Container>
	);
};

storiesOf("Header", module).add("Default", () => <Default />);

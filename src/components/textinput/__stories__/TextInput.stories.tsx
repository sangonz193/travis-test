import { Icon } from "../../icon/Icon";
import React from "react";
import { TextInput } from "../TextInput";
import { storiesOf } from "@storybook/react";
import styled from "styled-components";

const Container = styled.div`
	width: 300px;
	max-width: 80%;
	margin: auto;
`;

const InputRight = styled(Icon)`
	width: 50px;
`;

const Default = () => (
	<Container>
		<TextInput right={<InputRight name="play" />} />
	</Container>
);

storiesOf("TextInput", module).add("Default", () => <Default />);

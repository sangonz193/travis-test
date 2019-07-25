import { CreativeCommons } from "../CreativeCommons";
import React from "react";
import { storiesOf } from "@storybook/react";

const Default = () => <CreativeCommons />;

storiesOf("CreativeCommons", module).add("Default", () => <Default />);

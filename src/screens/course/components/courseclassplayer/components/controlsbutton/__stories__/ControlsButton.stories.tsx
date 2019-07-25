import { ControlsButton } from "../ControlsButton";
import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("ControlsButton", module).add("Default", () => <ControlsButton onPress={() => {}} iconName="play" />);

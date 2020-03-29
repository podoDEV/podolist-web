import { configure, addDecorator } from "@storybook/react";
import { makeDecorator } from "@storybook/addons";

import * as React from "react";
import { GlobalStyle } from "../src/globalStyle";

const withGlobal = makeDecorator({
  name: "withGlobalStyle",
  parameterName: "",
  wrapper: (getStory, context) => {
    return (
      <>
        <GlobalStyle />
        {getStory(context)}
      </>
    );
  }
});

addDecorator(withGlobal);
// automatically import all files ending in *.stories.tsx
configure(require.context("../stories", true, /\.stories\.tsx?$/), module);

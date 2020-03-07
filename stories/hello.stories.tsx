import * as React from "react";
import Hello from "../src/components/hello";

export default {
  title: "Hello"
};

export const redJung = () => {
  return <Hello color="red" />;
};

export const blueJung = () => {
  return <Hello color="blue" />;
};

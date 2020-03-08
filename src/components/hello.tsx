import React from "react";

interface Props {
  color: "red" | "blue";
}

export default function hello(props: Props) {
  return <div style={{ color: props.color }}>Hello world</div>;
}

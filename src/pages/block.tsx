import React from "react";

function mockFn() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ message: "resolve it" });
    }, 3000);
  });
}

type IProps = {
  message: string;
};

function Block({ message }: IProps) {
  return <div>{message}</div>;
}

Block.getInitialProps = async function() {
  const response = await mockFn();

  return response;
};

export default Block;

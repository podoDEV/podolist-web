import React from 'react';
import axios from 'axios';
// This page has defined `getInitialProps` to do data fetching.
// Next.js will execute `getInitialProps`
// It will wait for the result of `getInitialProps`
// When the results comes back Next.js will render the page.
// Next.js will do this for every request that comes in.

type IProps = {
  stars: number;
};

function HomePage({ stars }: IProps) {
  return <div>Next stars: {stars}</div>;
}

HomePage.getInitialProps = async () => {
  const {
    data: { stargazers_count }
  } = await axios.get('https://api.github.com/repos/zeit/next.js');

  return { stars: stargazers_count };
};

export default HomePage;

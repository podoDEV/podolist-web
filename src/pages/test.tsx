import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "redux/reducers";
import { decrease, increase } from "redux/reducers/countReducer";
import { wrapper } from "./_app";

export default function test(props) {
  const count = useSelector((state: IStore) => state.count.data);

  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increase())}>더하기</button>
      <button onClick={() => dispatch(decrease())}>빼기</button>
      <pre>이거슨 서버에서 주는 값입니다. {JSON.stringify(props)}</pre>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async function({ store }) {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      resolve("hoilzz");
    }, 1000);
  });

  store.dispatch(increase());

  return {
    props: {
      data
    }
  };
});

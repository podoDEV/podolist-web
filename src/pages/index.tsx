/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import {
  useEffect,
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useMemo,
  useRef
} from "react";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import { get } from "../common/fetch";
import Navigation from "../components/navigation/navigation";
import { applyTodo } from "../redux/actions/todo";
import { fetchUserInfo } from "../redux/actions/user";
import { setDarkMode } from "../redux/actions/style";
import { setLocalStorageDarkMode, getLocalStorageDarkMode } from "../common/styles/darkMode";
import { useTheme } from "emotion-theming";
import { Theme } from "../common/styles/Layout";
import TodoAdder from "components/todo-adder/TodoAdder";
import { GetServerSidePropsContext } from "next";
import { ITodo } from "redux/reducers/todo";
import TodoList from "components/todoList";
import { wrapper } from "./_app";

const TodoPageContainer = styled("div")`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const TodoContainer = styled.div`
  width: 100%;
  max-width: 750px;
`;

function getInitDarkMode() {
  const userDarkTheme = getLocalStorageDarkMode();

  if (userDarkTheme) {
    return userDarkTheme === "true";
  }

  return matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
}

export interface SelectedTodoContextType {
  selectedTodo: ITodo | undefined;
  setSelectedTodo: Dispatch<SetStateAction<SelectedTodoContextType["selectedTodo"]>>;
}

export const SelectedTodoContext = createContext<SelectedTodoContextType>(
  {} as SelectedTodoContextType
);

export default function TodoIndex() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [pageStatus, setPageStatus] = useState("NONE"); // NONE FETCHING
  const { preloader } = useTheme<Theme>();
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

  const selectedTodoContextValue = useMemo(
    () => ({
      selectedTodo,
      setSelectedTodo
    }),
    [selectedTodo, setSelectedTodo]
  );

  const fetchData = () => {
    setPageStatus("FETCHING");
    const numb = date.format("YYYYMMDD");
    // @TODO: saga로 빼기
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
      setPageStatus("NONE");
    });
  };

  const isMountedOnce = useRef(false);
  useEffect(() => {
    if (isMountedOnce.current) {
      fetchData();
    }
  }, [date]);

  useEffect(() => {
    isMountedOnce.current = true;
  }, []);

  useEffect(() => {
    const darkMode = getInitDarkMode();
    dispatch(setDarkMode(darkMode));
    setLocalStorageDarkMode(darkMode);

    dispatch(fetchUserInfo());
  }, []);

  return (
    <TodoPageContainer>
      <Navigation date={date} setDate={setDate} />
      <SelectedTodoContext.Provider value={selectedTodoContextValue}>
        <TodoContainer>
          {pageStatus === "FETCHING" ? <img src={preloader} /> : <TodoList date={date} />}
          <TodoAdder fetchTodo={fetchData} />
        </TodoContainer>
      </SelectedTodoContext.Provider>
    </TodoPageContainer>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(async context => {
  const { store, req, res } = context;
  const cookie = req.headers.cookie;
  const numb = dayjs().format("YYYYMMDD");
  // cookie에 값이 없거나
  // 응답값에 에러(401이라던가)가 있을 경우 login page로 리다이렉트
  if (!cookie) {
    res.writeHead(301, {
      Location: "/login"
    });
    res.end();
    return;
  }

  try {
    const data = await get(apiUrl.fetchItems(numb), { headers: { Cookie: cookie } });
    store.dispatch(applyTodo(data));
  } catch (error) {
    res.writeHead(301, {
      Location: "/login"
    });
    res.end();
  }
});

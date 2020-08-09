/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as apiUrl from "../common/apiUrl";
import { get } from "../common/fetch";
import Navigation from "../components/navigation/navigation";
import { applyTodo } from "../redux/actions/todo";
import { fetchUserInfo } from "../redux/actions/user";
import { setDarkMode } from "../redux/actions/style";
import { setLocalStorageDarkMode, getLocalStorageDarkMode } from "../common/styles/darkMode";
import TodoAdder from "components/todo-adder/TodoAdder";
import TodoList from "components/todoList";
import SelectedTodoProvider from "context/selectedTodoContext";
import { isIOSBrowser } from "common/util";

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

const DownloadNotice = styled("div")`
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 12px;
  width: 100%;
  justify-content: center;
  background-color: #e0e0e0;
`;

const CloseBtn = styled("button")`
  border: none;
  background: transparent;
  position: absolute;
  right: 15px;
  font-size: 10px;
`;

function getInitDarkMode() {
  const userDarkTheme = getLocalStorageDarkMode();

  if (userDarkTheme) {
    return userDarkTheme === "true";
  }

  return matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function TodoIndex() {
  const dispatch = useDispatch();
  const [date, setDate] = useState(dayjs());
  const [showAppDownload, setShowAppDownload] = useState(false);

  useEffect(() => {
    setShowAppDownload(isIOSBrowser());
  }, []);

  const closeNoticeArea = () => {
    setShowAppDownload(false);
  };

  const fetchData = () => {
    const numb = date.format("YYYYMMDD");
    // @TODO: saga로 빼기
    get(apiUrl.fetchItems(numb)).then(res => {
      dispatch(applyTodo(res));
    });
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  useEffect(() => {
    const darkMode = getInitDarkMode();
    dispatch(setDarkMode(darkMode));
    setLocalStorageDarkMode(darkMode);

    dispatch(fetchUserInfo());
  }, []);

  return (
    <TodoPageContainer>
      {showAppDownload && (
        <DownloadNotice>
          <span>
            앱스토어에서{" "}
            <a href="https://itunes.apple.com/kr/app/podolist/id1439078928?mt=8">포도리스트</a>를
            만나보세요!🙋‍♀️🙆‍♂️
          </span>
          <CloseBtn onClick={closeNoticeArea}>닫기</CloseBtn>
        </DownloadNotice>
      )}
      <Navigation date={date} setDate={setDate} />
      <SelectedTodoProvider>
        <TodoContainer>
          <TodoList date={date} />
          <TodoAdder fetchTodo={fetchData} />
        </TodoContainer>
      </SelectedTodoProvider>
    </TodoPageContainer>
  );
}

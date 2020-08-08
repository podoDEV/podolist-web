import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useState,
  useMemo,
  ReactNode
} from "react";
import { TodoType } from "redux/reducers/todo";

export interface SelectedTodoContextType {
  selectedTodo: TodoType | undefined;
  setSelectedTodo: Dispatch<SetStateAction<SelectedTodoContextType["selectedTodo"]>>;
}

export const SelectedTodoContext = createContext<SelectedTodoContextType>(
  {} as SelectedTodoContextType
);

type SelectedTodoProviderProps = {
  children: ReactNode;
};

export default function SelectedTodoProvider({ children }: SelectedTodoProviderProps) {
  const [selectedTodo, setSelectedTodo] = useState<TodoType | undefined>(undefined);

  const selectedTodoContextValue = useMemo(
    () => ({
      selectedTodo,
      setSelectedTodo
    }),
    [selectedTodo, setSelectedTodo]
  );

  return (
    <SelectedTodoContext.Provider value={selectedTodoContextValue}>
      {children}
    </SelectedTodoContext.Provider>
  );
}

export const useSelectedTodo = () => {
  const selectedTodoContext = useContext(SelectedTodoContext);
  return selectedTodoContext;
};

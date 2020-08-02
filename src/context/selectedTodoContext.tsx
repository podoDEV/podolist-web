import {
  createContext,
  SetStateAction,
  Dispatch,
  useContext,
  useState,
  useMemo,
  ReactNode
} from "react";
import { ITodo } from "redux/reducers/todo";

export interface SelectedTodoContextType {
  selectedTodo: ITodo | undefined;
  setSelectedTodo: Dispatch<SetStateAction<SelectedTodoContextType["selectedTodo"]>>;
}

export const SelectedTodoContext = createContext<SelectedTodoContextType>(
  {} as SelectedTodoContextType
);

type SelectedTodoProviderProps = {
  children: ReactNode;
};

export default function SelectedTodoProvider({ children }: SelectedTodoProviderProps) {
  const [selectedTodo, setSelectedTodo] = useState<ITodo | undefined>(undefined);

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

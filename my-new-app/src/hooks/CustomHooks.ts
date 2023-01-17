import { useState } from "react";
import FormatCheck from "../formatCheck";

export const MyCustomHook = (): MyCustomHook => {
  const [count, setCount] = useState<number>(0);

  const Increment = () => {
    setCount(count => count + 1);
  }

  return { count, Increment }
}

export const ContentHook = (): ContentHook => {
  const [content, setContent] = useState<string>("");

  const SetContent = (value: string) => {
    setContent(value);
  }

  return { content, SetContent }
}

export const DueDateHook = (): DueDateHook => {
  const [dueDate, setDueDate] = useState<string>("");

  const SetDueDate = (value: string) => {
    setDueDate(value);
  }

  return { dueDate, SetDueDate }
}

export const ModalWindowHook = (): ModalWindowHook => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }
  
  const closeModal = () => {
    setIsOpen(false);
  }

  return { modalIsOpen, openModal, closeModal }
}

export const DeleteHook = (): DeleteHook => {
  const [todos, setTodos] = useState<Todo[]>([]);

  return { todos, setTodos }
}

export const TodoHook = (): TodoHook => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState<string>("");
  const [isChangedContent, setIsChangedContent] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string>("");
  const [isChangedDueDate, setIsChangedDueDate] = useState<boolean>(false);

  const SetContent = (content: string) => {
    SetIsChangedContent(true);
    setContent(content);
  }

  const SetDueDate = (date: string) => {
    SetIsChangedDueDate(true);
    setDueDate(date);
  }

  const SetIsChangedContent = (flag: boolean) => {
    setIsChangedContent(flag);
  }

  const SetIsChangedDueDate = (flag: boolean) => {
    setIsChangedDueDate(flag);
  }

  const UpdateContent = async (id: number) => {
    if(!isChangedContent) return;
    SetIsChangedContent(false);
    await window.sql.updateContent(id, content, "content");
  }

  const UpdateDueDate = async (id: number) => {
    if(!isChangedDueDate) return;
    if(!FormatCheck(dueDate)) return;
    SetIsChangedDueDate(false);
    await window.sql.updateDueDate(id, dueDate, "due_date");
  }

  const SortTodosByDueDate = (todos: Todo[]) => {
    todos.sort((prev, next) => {
      const [a, b] = prev.due_date.split(" ");
      const [c, d] = next.due_date.split(" ");
      return new Date(`${a}T${b}:00.125Z`).getTime() - new Date(`${c}T${d}:00.125Z`).getTime();
    });
  }

  const UpdateDoNoticeInTodo = async (id: number) => {
    await window.sql.updateDoNoticeInTodo(id);
  }

  const CompleteTodo = async (id: number) => {
    const todo = await window.sql.selectTodo(id);
    await window.sql.insertComplete(todo.content);
    await window.sql.deleteTodo(id);
  }

  const DeleteTodo = (id: number) => {
    if(!confirm("Do you wish to delete it?")) return;
    window.sql.deleteTodo(id);
  }

  return {
    todos: todos,
    setTodos: setTodos,
    content: content,
    isChangedContent: isChangedContent,
    dueDate: dueDate,
    isChangedDueDate: isChangedDueDate,
    SetContent: SetContent,
    SetDueDate: SetDueDate,
    SetIsChangedContent: SetIsChangedContent,
    SetIsChangedDueDate: SetIsChangedDueDate,
    UpdateContent: UpdateContent,
    UpdateDueDate: UpdateDueDate,
    SortTodosByDueDate: SortTodosByDueDate,
    UpdateDoNoticeInTodo: UpdateDoNoticeInTodo,
    CompleteTodo: CompleteTodo,
    DeleteTodo: DeleteTodo,
  }
}

export const NotificationIntervalHook = (): NotificationIntervalHook => {
  const [interval, setInterval] = useState<number>(1);

  const SetInterval = (newInterval: string) => {
    const castedNumber = Number(newInterval);
    setInterval(castedNumber);
  }

  const UpdateNotification = async () => {
    await window.sql.updateNotification(interval);
  }

  return { interval, SetInterval, UpdateNotification }
}

export const CompleteHook = (): CompleteHook => {
  const [completes, setCompletes] = useState<Complete[]>([]);

  const DeleteComplete = async (id: number) => {
    await window.sql.deleteComplete(id);
  }

  return { completes, setCompletes, DeleteComplete }
}
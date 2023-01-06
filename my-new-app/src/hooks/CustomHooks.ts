import { useState } from "react";

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
import React from "react";
import Register from "./Register";
import Header from "./Header";
import ModalWindow from "./ModalWindow";
import { ContentHook, DueDateHook, ModalWindowHook } from "../hooks/CustomHooks";
import '../styles/Create.css'

const Create: React.FC = () => {
  const { content, SetContent } = ContentHook();
  const { dueDate, SetDueDate } = DueDateHook();
  const { modalIsOpen, openModal, closeModal } = ModalWindowHook();

  const CreateTodo = async () => {
    try {
      await window.sql.insertTodo(content, dueDate);
      openModal();
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div id="root">
      <Header />
      <Register
        SetContent={ SetContent }
        SetDueDate={ SetDueDate }
        CreateTodo={ CreateTodo }
      />
      <ModalWindow
        modalIsOpen={ modalIsOpen }
        closeModal={ closeModal }
      />
    </div>
    
  )
}

export default Create;


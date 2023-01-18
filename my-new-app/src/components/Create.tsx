import React, { useEffect } from "react";
import Register from "./Register";
import Header from "./Header";
import ModalWindow from "./ModalWindow";
import { ContentHook, DueDateHook, ModalWindowHook } from "../hooks/CustomHooks";
import FormatCheck from "../formatCheck";
import '../styles/Create.css'

const Create: React.FC = () => {
  const { content, SetContent } = ContentHook();
  const { dueDate, SetDueDate } = DueDateHook();
  const { modalIsOpen, openModal, closeModal } = ModalWindowHook();

  useEffect(() => {
    const elemContent = document.getElementById("textareaForContent") as HTMLTextAreaElement;
    const elemDueDate = document.getElementById("inputForDueDate") as HTMLInputElement;
    elemContent.value = "";
    elemDueDate.value = "";
  }, [modalIsOpen]);

  const CreateTodo = async () => {
    try {
      if(!FormatCheck(dueDate)) {
        alert("日付のフォーマットが無効です");
        return;
      };
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


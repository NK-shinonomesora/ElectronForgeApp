import React, { useState } from "react";
import Register from "./Register";
import Header from "./Header";
import ModalWindow from "./ModalWindow";
import '../styles/Create.css'

const Create: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const CreateTodo = async () => {
    try {
      await window.sql.insertTodo(todo, dueDate);
      openModal();
    } catch(err) {
      console.log(err);
    }
  }
  
  const SetTodo = (value: string) => {
    setTodo(value);
  }
  
  const SetDueDate = (date: string) => {
    setDueDate(date);
  }
  
  function openModal() {
    setIsOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id="root">
      <Header />
      <Register
        SetTodo={ SetTodo }
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


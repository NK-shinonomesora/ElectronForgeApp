import React, { useState, createContext, useContext } from "react";
import Modal from 'react-modal';
import '../styles/Create.css'

Modal.setAppElement(document.getElementById("root"));

interface CreateProp {
  todo: string
  SetTodo: (value: string) => void
  SetDueDate: (date: string) => void
  CreateTodo: () => void
  modalIsOpen: boolean
  setIsOpen: (flag: boolean) => void
  openModal: () => void
  closeModal: () => void
}

const CreateProp = (): CreateProp => {
  const [todo, setTodo] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const SetTodo = (value: string) => {
    setTodo(value);
  }

  const SetDueDate = (date: string) => {
    setDueDate(date);
  }

  const CreateTodo = async () => {
    try {
      await sql.insertTodo(todo, dueDate);
      openModal();
    } catch(err) {
      console.log(err);
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return {
    todo: todo,
    SetTodo: SetTodo,
    SetDueDate: SetDueDate,
    CreateTodo: CreateTodo,
    modalIsOpen: modalIsOpen,
    setIsOpen: setIsOpen,
    openModal: openModal,
    closeModal: closeModal,
  }
}

const CreateContext = createContext<CreateProp | null>(null);

const Create = () => {
  const data = CreateProp();

  return (
    <CreateContext.Provider value={data}>
      <div id="root">
        <Register />
        <ModalWindow />
      </div>
    </CreateContext.Provider>
    
  )
}

export default Create;

const Register = () => {
  const createContext = useContext(CreateContext);
  if(!createContext) return null;
  const { SetTodo, SetDueDate } = createContext;

  return (
    <>
    <h2>In this page to create a todo</h2>
    <p>Enter a todo</p>
    <textarea onChange={(e) => SetTodo(e.target.value)} className={"textareaForTodo"}></textarea>
    <p>Enter due date</p>
    <input onChange={(e) => SetDueDate(e.target.value)} type="text" className={"inputForDueDate"}></input>
    
    </>
  )
}

const ModalWindow = () => {
  const createContext = useContext(CreateContext);
  if(!createContext) return null;
  const { CreateTodo, modalIsOpen, closeModal } = createContext;

  return (
    <div>
      <p>Push button</p>
      <button onClick={() => CreateTodo()}>To create</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  )
}
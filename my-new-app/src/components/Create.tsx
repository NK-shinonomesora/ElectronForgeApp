import React, { useState, createContext, useContext } from "react";
import Header from "./Header";
import Modal from 'react-modal';
import '../styles/Create.css'

Modal.setAppElement(document.getElementById("root"));

type SetTodo = (todo: string) => void
type SetDueDate = (dueDate: string) => void
type SetIsOpen = (flag: boolean) => void
type DummyFunc = () => void

interface CreateProp {
  todo: string
  setTodo: SetTodo
  dueDate: string
  setDueDate: SetDueDate
  modalIsOpen: boolean
  setIsOpen: SetIsOpen
  DummyFunc: DummyFunc
}

export const CreateTodo = async (todo: string, dueDate: string, setIsOpen: SetIsOpen) => {
  try {
    await window.sql.insertTodo(todo, dueDate);
    openModal(setIsOpen);
  } catch(err) {
    console.log(err);
  }
}

const SetTodo = (value: string, setTodo: SetTodo) => {
  setTodo(value);
}

const SetDueDate = (date: string, setDueDate: SetDueDate) => {
  setDueDate(date);
}

function openModal(setIsOpen: SetIsOpen) {
  setIsOpen(true);
}

function closeModal(setIsOpen: SetIsOpen) {
  setIsOpen(false);
}

export const CreateProp = (): CreateProp => {
  const [todo, setTodo] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const DummyFunc = () => {
    console.log("Dummy Func");
  }

  return {
    todo: todo,
    setTodo: setTodo,
    dueDate: dueDate,
    setDueDate: setDueDate,
    modalIsOpen: modalIsOpen,
    setIsOpen: setIsOpen,
    DummyFunc: DummyFunc,
  }
}

export const CreateContext = createContext<CreateProp | null>(null);

const Create: React.FC = () => {
  const data = CreateProp();

  return (
    <CreateContext.Provider value={ data }>
      <div id="root">
        <Header />
        <Register />
        <ModalWindow />
      </div>
    </CreateContext.Provider>
    
  )
}

export default Create;

const Register: React.FC = () => {
  const createContext = useContext(CreateContext);
  if(!createContext) return null;
  const { setTodo, setDueDate } = createContext;

  return (
    <>
    <h2>In this page to create a todo</h2>
    <p>Enter a todo</p>
    <textarea onChange={(e) => SetTodo(e.target.value, setTodo)} className={"textareaForTodo"}></textarea>
    <p>Enter due date</p>
    <input onChange={(e) => SetDueDate(e.target.value, setDueDate)} type="text" className={"inputForDueDate"}></input>
    
    </>
  )
}

const ModalWindow: React.FC = () => {
  const createContext = useContext(CreateContext);
  if(!createContext) return null;
  const { todo, dueDate, setIsOpen, modalIsOpen } = createContext;

  return (
    <div>
      <p>Push button</p>
      <button onClick={() => CreateTodo(todo, dueDate, setIsOpen)}>To create</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => closeModal(setIsOpen)}
        contentLabel="Example Modal"
      >
        <button onClick={() => closeModal(setIsOpen)}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  )
}
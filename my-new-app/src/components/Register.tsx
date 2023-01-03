import React from "react";

interface RegisterProp {
  SetTodo: (value: string) => void
  SetDueDate: (date: string) => void
  CreateTodo: () => void
}

const Register: React.FC<RegisterProp> = ({ SetTodo, SetDueDate, CreateTodo }) => {
  return (
    <>
    <h2>In this page to create a todo</h2>
    <p>Enter a todo</p>
    <textarea onChange={(e) => SetTodo(e.target.value)} className={"textareaForTodo"}></textarea>
    <p>Enter due date</p>
    <input onChange={(e) => SetDueDate(e.target.value)} type="text" className={"inputForDueDate"}></input>
    <p>Push button</p>
    <button data-testid="createTodoButton" onClick={() => CreateTodo()}>To create</button>
    </>
  )
}

export default Register;
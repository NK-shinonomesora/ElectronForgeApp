import React from "react";

interface RegisterProp {
  SetContent: (value: string) => void
  SetDueDate: (date: string) => void
  CreateTodo: () => void
}

const Register: React.FC<RegisterProp> = ({ SetContent, SetDueDate, CreateTodo }) => {
  return (
    <>
    <h2>In this page to create a todo</h2>
    <p>Enter a todo</p>
    <textarea
      id="textareaForContent"
      data-testid="SetContent"
      onChange={(e) => SetContent(e.target.value)}
      className={"textareaForTodo"}>
    </textarea>
    <p>Enter due date</p>
    <input
      id="inputForDueDate"
      data-testid="SetDueDate"
      onChange={(e) => SetDueDate(e.target.value)}
      type="date"
      className={"inputForDueDate"}>
    </input>
    <p>Push button</p>
    <button onClick={() => CreateTodo()}>To create</button>
    </>
  )
}

export default Register;
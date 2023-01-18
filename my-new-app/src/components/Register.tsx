import React from "react";

interface RegisterProp {
  SetContent: (value: string) => void
  SetDueDate: (date: string) => void
  CreateTodo: () => void
}

const Register: React.FC<RegisterProp> = ({ SetContent, SetDueDate, CreateTodo }) => {
  return (
    <>
    <h2>新しいタスクを入力してください</h2>
    <p>タスク</p>
    <textarea
      id="textareaForContent"
      data-testid="SetContent"
      onChange={(e) => SetContent(e.target.value)}
      className={"textareaForTodo"}>
    </textarea>
    <p>期限（"2023-01-20 13:00"のようなフォーマットで入力してください。）</p>
    <input
      id="inputForDueDate"
      data-testid="SetDueDate"
      onChange={(e) => SetDueDate(e.target.value)}
      type="text"
      className={"inputForDueDate"}>
    </input>
    <p>
      <button onClick={() => CreateTodo()}>作成する</button>
    </p>
    </>
  )
}

export default Register;
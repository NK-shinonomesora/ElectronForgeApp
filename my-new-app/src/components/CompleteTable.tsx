import React from "react";
import "../styles/Todo.css"

interface CompleteTableProp {
  completes: Complete[]
  DeleteComplete: (id: number) => void
}

const CompleteTable: React.FC<CompleteTableProp> = ({ completes, DeleteComplete }) => {
  return (
    <>
    <table>
      <thead>
        <tr>
          <th colSpan={3}>The all completes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Contents</td>
          <td>CompleteDate</td>
          <td>Delete</td>
        </tr>
      {
        completes.map((complete, i) => (
          <tr key={i}>
            <td className={"todoTable"}>{complete.content}</td>
            <td>{complete.date}</td>
            <td>
              <button onClick={() => DeleteComplete(complete.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
    </>
  )
}

export default CompleteTable;
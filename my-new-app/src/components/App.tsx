import React from "react";
import { Routes, Route } from "react-router-dom"
import Start from "./Start";
import HomePage from "./HomePage";
import DataBase from "./DataBase";
import Create from "./Create";
import Delete from "./Delete";
import Todo from "./Todo";
import Dummy from "./Dummy";

const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/database" element={<DataBase />} />
      <Route path="/create" element={<Create />} />
      <Route path="/delete" element={<Delete />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/dummy" element={<Dummy />} />
    </Routes>
    </>
  )
}

export default App;
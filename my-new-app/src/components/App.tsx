import React from "react";
import { Routes, Route } from "react-router-dom"
import Start from "./Start";
import HomePage from "./HomePage";
import DataBase from "./DataBase";
import Create from "./Create";

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/database" element={<DataBase />} />
      <Route path="/create" element={<Create />} />
    </Routes>
    </>
  )
}

export default App;
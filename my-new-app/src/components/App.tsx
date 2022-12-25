import React from "react";
import { Routes, Route } from "react-router-dom"
import HomePage from "./HomePage";
import Header from "./Header";
import DataBase from "./DataBase";
import Create from "./Create";

const App = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/database" element={<DataBase />} />
      <Route path="/create" element={<Create />} />
    </Routes>
    </>
  )
}

export default App;
import React from "react";
import { Link } from "react-router-dom";

const TableCreateIfNoTable = async () => {
  if(!(await window.sql.isFileSizeGreaterThanZero("../../todo"))) {
    window.sql.tableCreate();
  }
}

const Start: React.FC = () => {
  return (
    <>
    <Link to="/homepage"><p onClick={() => TableCreateIfNoTable()}>Start todo app!</p></Link>
    </>
  )
}

export default Start;
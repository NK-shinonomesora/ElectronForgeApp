import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'

const Header: React.FC = () => {
  return (
    <>
    <header className={"header"}>
      <div className={"headerBox"}>
        <Link to="/"><h2 className={"headerContent"}>HomePage</h2></Link>
        <Link to="/database"><h2 className={"headerContent"}>DataBase</h2></Link>
        <h2 className={"headerContent"}>Todos</h2>
        <Link to="/create"><h2 className={"headerContent"}>Create</h2></Link>
        <h2 className={"headerContent"}>Update</h2>
        <h2 className={"headerContent"}>Delete</h2>
      </div>
    </header>
    </>
  )
}

export default Header;
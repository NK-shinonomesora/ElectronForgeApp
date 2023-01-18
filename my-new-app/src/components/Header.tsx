import React from "react";
import { Link } from "react-router-dom";
import '../styles/Header.css'

const Header: React.FC = () => {
  return (
    <>
    <header className={"header"}>
      <div className={"headerBox"}>
        <Link to="/homepage"><h2 className={"headerContent"}>HomePage</h2></Link>
        <Link to="/create"><h2 className={"headerContent"}>Create</h2></Link>
        <Link to="/todo"><h2 className={"headerContent"}>Todo</h2></Link>
        {/* <Link to="/database"><h2 className={"headerContent"}>DataBase</h2></Link> */}
        <Link to="/complete"><h2 className={"headerContent"}>Complete</h2></Link>
        <Link to="/setting"><h2 className={"headerContent"}>Setting</h2></Link>
      </div>
    </header>
    </>
  )
}

export default Header;
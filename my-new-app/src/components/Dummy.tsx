import React, { useContext } from "react";
import { CreateContext } from "./Create";

const Dummy: React.FC = () => {
  const createContext = useContext(CreateContext);
  if(!createContext) return null;
  const { DummyFunc } = createContext;

  return (
    <div onClick={() => DummyFunc()} data-testid="createTodoButton">
      <p>Dummy</p>
    </div>
  )
}

export default Dummy;
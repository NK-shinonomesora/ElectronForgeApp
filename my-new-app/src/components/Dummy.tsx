import React from "react";
import DummyRender from "./DummyRender";
import { MyCustomHook } from "../hooks/CustomHooks";

const Dummy: React.FC = () => {
  const { count, Increment } = MyCustomHook();

  return (
    <>
    <DummyRender count={count} Increment={Increment}/>
    </>
  )
}

export default Dummy;
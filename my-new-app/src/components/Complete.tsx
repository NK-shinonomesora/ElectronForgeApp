import React, { useEffect } from "react";
import Header from "./Header";
import CompleteTable from "./CompleteTable";
import { CompleteHook } from "../hooks/CustomHooks";

const Complete: React.FC = () => {
  const { completes, setCompletes, DeleteComplete } = CompleteHook();

  useEffect(() => {
    (async () => {
      const res = await window.sql.selectCompletes();
      setCompletes(res);
    })();
  }, [completes]);

  return (
    <>
    <Header />
    <CompleteTable 
      completes={ completes }
      DeleteComplete={ DeleteComplete }
    />
    </>
  )
}

export default Complete;
import React from "react";

const DummyRender: React.FC<MyCustomHook> = ({ count, Increment }) => {
  return (
    <>
    <p>Now Count = {count}</p>
    <button onClick={() => Increment()}>Increment</button>
    </>
  )
}

export default DummyRender;
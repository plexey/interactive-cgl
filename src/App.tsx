import type { Component } from "solid-js";
import { clearMatrix, step, togglePause, transposeMatrix } from "./stores";
import Layout from "./views/Layout";

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.code) {
    case "KeyP":
      togglePause();
      return;
    case "KeyS":
      step();
      return;
    case "KeyR":
      transposeMatrix();
      return;
    case "KeyC":
      clearMatrix();
      return;
  }
};

const App: Component = () => {
  addEventListener("keypress", handleKeyDown);
  return <Layout />;
};

export default App;

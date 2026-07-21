import React from "react";
import ReactDOM from "react-dom/client";
import Carosello from "./components/Carosello";

const caroselloRoot = document.getElementById("carosello");

if (caroselloRoot) {
  ReactDOM.createRoot(caroselloRoot).render(<Carosello />);
}
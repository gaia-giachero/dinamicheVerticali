import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";

const menuRoot = document.getElementById("menu");

if (menuRoot) {
  ReactDOM.createRoot(menuRoot).render(<Navbar />);
}
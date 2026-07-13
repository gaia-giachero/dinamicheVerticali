import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Carosello from "./components/Carosello";
import CampoRicerca from "./components/CampoRicerca";

const menuRoot = document.getElementById("menu");
const caroselloRoot = document.getElementById("carosello");
const ricercaRoot = document.getElementById("ricerca");
const pillarPageRoot = document.getElementById("pillar-page");
const footerRoot = document.getElementById("footer");

if (menuRoot) {
  ReactDOM.createRoot(menuRoot).render(<Navbar />);
  ReactDOM.createRoot(caroselloRoot).render(<Carosello />);
  ReactDOM.createRoot(ricercaRoot).render(<CampoRicerca />);
  ReactDOM.createRoot(pillarPageRoot).render(<PillarPage />);
  ReactDOM.createRoot(footerRoot).render(<Footer />);
}
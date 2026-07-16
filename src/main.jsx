import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Carosello from "./components/Carosello";
import CampoRicerca from "./components/CampoRicerca";
import PillarPage from "./components/PillarPage";
import Footer from "./components/Footer";

const menuRoot = document.getElementById("menu");
const caroselloRoot = document.getElementById("carosello");
const ricercaRoot = document.getElementById("ricerca");
const pillarPageRoot = document.getElementById("pillar-page");
const footerRoot = document.getElementById("footer");

if (menuRoot) {
  ReactDOM.createRoot(menuRoot).render(<Navbar />);
}

if (caroselloRoot) {
  ReactDOM.createRoot(caroselloRoot).render(<Carosello />);
}

if (ricercaRoot) {
  ReactDOM.createRoot(ricercaRoot).render(<CampoRicerca />);
}

if (pillarPageRoot) {
  ReactDOM.createRoot(pillarPageRoot).render(<PillarPage />);
}

if (footerRoot) {
  ReactDOM.createRoot(footerRoot).render(<Footer />);
}
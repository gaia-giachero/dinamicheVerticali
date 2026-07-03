import React from "react";
import ReactDOM from "react-dom/client";
import Menu from "./components/Menu";
import CourseGrid from "./components/CourseGrid";

// MENU
const menuRoot = document.getElementById("menu-root");
if (menuRoot) {
  ReactDOM.createRoot(menuRoot).render(<Menu />);
}

// CORSI
const coursesRoot = document.getElementById("courses-root");
if (coursesRoot) {
  ReactDOM.createRoot(coursesRoot).render(<CourseGrid />);
}
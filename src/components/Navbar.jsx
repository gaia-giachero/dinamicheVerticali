import { useState, useEffect, useEffectEvent } from "react";
import '../../assets/style/style-navbar.css';

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activePage, setActivePage] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // 
    const page = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");

    setActivePage(page);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setOpenIndex(null);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth > 768){
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileOpen(!isMobileOpen);
  }

  // VARIABILI PER STILE
  const isCertificazioniActive =
    activePage === "irata" ||
    activePage === "gwo" ||
    activePage === "pti";

  const isCorsiActive =
    activePage === "fune" ||
    activePage === "lavori-in-quota" ||
    activePage === "soccorso" ||
    activePage === "corsi-accreditati";

  return (
    <nav id="navbar">
      <a href="index.html">
        <img
          src="/public/img/logo-dinamiche-verticali-formazione.svg"
          alt="Dinamiche Verticali Formazione"
          width="150"
        />
      </a>

      {/* HAMBURGER BUTTON */}
      <button
        className={`hamburger ${isMobileOpen ? "open" : ""}`}
        onClick={toggleMobileMenu}
        aria-label="Apri menu"
        aria-expanded={isMobileOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`menu ${isMobileOpen ? "menu-open" : ""}`}>
        {/* HOME */}
        <li className={activePage === "index" ? "active" : ""}>
          <a href="index.html">HOME</a>
        </li>

        {/* CERTIFICAZIONI */}
        <li className={`dropdown ${openIndex === 1 || isCertificazioniActive ? "active" : ""
          }`} onClick={(e) => e.stopPropagation()}>
          <span onClick={() => toggle(1)} style={{ cursor: "pointer" }}>
            CERTIFICAZIONI ⌵
          </span>

          {openIndex === 1 && (
            <ul className="dropdown-menu">
              <li><a href="/pages/irata.html">IRATA</a></li>
              <li><a href="/pages/gwo.html">GWO</a></li>
              <li><a href="/pages/pti.html">PTI</a></li>
            </ul>
          )}
        </li>

        {/* ALTRI CORSI */}
        <li className={`dropdown ${openIndex === 2 || isCorsiActive ? "active" : ""
          }`} onClick={(e) => e.stopPropagation()}>
          <span onClick={() => toggle(2)} style={{ cursor: "pointer" }}>
            ALTRI CORSI ⌵
          </span>

          {openIndex === 2 && (
            <ul className="dropdown-menu">
              <li><a href="fune.html">FUNE D.LGS. 81/08</a></li>
              <li><a href="lavori-in-quota.html">LAVORI IN QUOTA</a></li>
              <li><a href="soccorso.html">SOCCORSO</a></li>
              <li><a href="corsi-accreditati.html">CORSI ACCREDITATI</a></li>
            </ul>
          )}
        </li>

        {/* NEWS */}
        <li className={activePage === "news" ? "active" : ""}>
          <a href="/pages/news.html">NEWS</a>
        </li>

        {/* CONTATTI */}
        <li className={activePage === "contatti" ? "active" : ""}>
          <a href="contatti.html">CONTATTI</a>
        </li>
      </ul>
    </nav>
  );
}
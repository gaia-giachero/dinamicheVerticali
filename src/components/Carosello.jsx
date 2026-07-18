import React, { useEffect, useState } from "react";
import "../../assets/style/style-carosello.css";

// colori e articoli da modificare con il piano editoriale
// colori da usare
const colori = {
  "Fune D.Lgs. 81/08": "#3DB876",
  "GWO": "#EF546C",
  "IRATA": "#33658A",
  "Lavori in Quota": "#FFCD09",
  "PTI": "#212529",
  "Soccorso": "#DC3545",
  "Corsi accreditati": "#17BEBB",
  "Default": "#ccc",
};

const datiArticoli = [
  {
    id: 1,
    titolo: "PETZL ROPETRIP® UNA KERMESSE INDIMENTICABILE",
    categoria: "Fune D.Lgs. 81/08",
    data: "2026-07-13",
    immagine: "ropetrip.jpg",
    descrizione:
      "Condivisione e passione sono stati gli ingredienti fondamentali dell’edizione 2025 che si è rivelata un successo.",
    riferimenti: "Corsi Accreditati, GWO, Lavori in Quota",
  },
  {
    id: 2,
    titolo: "LAMPADE FRONTALI: PIXA® SI RINNOVA E ILLUMINA OGNI AMBIENTE",
    categoria: "GWO",
    data: "2026-07-12",
    immagine: "torcia-frontale.jpg",
    descrizione:
      "Le lampade frontali della gamma PIXA® sono da sempre fedeli compagne per gli addetti impegnati in svariati comparti lavorativi.",
    riferimenti: "Corsi Accreditati, GWO, Lavori in Quota",
  },
  {
    id: 3,
    titolo: "NUOVA IMBRACATURA PETZL ASTRO®",
    categoria: "IRATA",
    data: "2026-07-11",
    immagine: "imbracatura.jpeg",
    descrizione:
      "Comfort e praticità sono le parole chiave per descrivere ASTRO® questa imbracatura è la soluzione ideale per affrontare tutte le situazioni di lavoro ed è perfetta per garantire il massimo comfort anche nelle sospensioni prolungate grazie ai due sedili ora associati a questa gamma.",
    riferimenti: "Soccorso, Corsi Accreditati, GWO, Lavori in Quota",
  },
];

export default function CarouselAutoplay() {
  // ordina per data e prende gli ultimi 3
  const ultimiArticoli = [...datiArticoli]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 3);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // autoplay
  useEffect(() => {
    if (isHovered) return;

    const intervallo = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === ultimiArticoli.length - 1 ? 0 : prev + 1,
      );
    }, 4000);

    return () => clearInterval(intervallo);
  }, [isHovered, ultimiArticoli.length]);

  return (
    <div className="carousel-wrapper">
      <h2>Articoli Recenti</h2>

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {ultimiArticoli.map((articolo) => {
            // colore del bordo in base alla categoria
            const coloreBordo = colori[articolo.categoria] || colori.Default;

            return (
              <div
                className="articolo-card"
                key={articolo.id}
                style={{
                  "--corso-color": coloreBordo,
                  borderColor: coloreBordo,
                }}
              >
                <div className="img-container">
                  <img src={`/img/articoli/${articolo.immagine}`} alt={articolo.titolo} />
                </div>
                <div className="card-body">
                  <span className="articolo-data">{articolo.data}</span>
                  <h3>{articolo.titolo}</h3>
                  <p className="descrizione">{articolo.descrizione}</p>
                  <div className="riferimenti-riga">
                    <p className="riferimenti-testo">{articolo.riferimenti}</p>
                    <a href={`/corso/${articolo.id}`} className="leggi-di-piu">
                      Leggi di più
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* pallini indicatori */}
      <div className="carousel-dots">
        {ultimiArticoli.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Vai alla slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

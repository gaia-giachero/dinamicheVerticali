import React, { useEffect, useState } from "react";
import "../../assets/style/style-news.css";

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

const page = [
    { id: 1, titolo: "Fune D.Lgs. 81/08", categoria: "Fune D.Lgs. 81/08", image: "fune.webp" },
    { id: 2, titolo: "GWO", categoria: "GWO", image: "gwo.webp" },
    { id: 3, titolo: "IRATA", categoria: "IRATA", image: "irata.webp" },
    { id: 4, titolo: "Lavori in Quota", categoria: "Lavori in Quota", image: "lavori-in-quota.webp" },
    { id: 5, titolo: "PTI", categoria: "PTI", image: "pti.webp" },
    { id: 6, titolo: "Soccorso", categoria: "Soccorso", image: "itra.webp" },
    { id: 7, titolo: "Corsi accreditati", categoria: "Corsi accreditati", image: "corsi-accreditati.webp" }
]

export default function PillarPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <div className="grid-container">
            {
                page.map((pagina) => {
                    // colore del bordo in base alla categoria
                    const bordo = colori[pagina.categoria] || colori.Default;

                    return (
                        <div
                            className="card"
                            key={pagina.id}
                            // insrisco il valore di coloreBordo in una variabile 
                            // che andrò a riprendere nello stile
                            style={{ "--corso-color": bordo, borderColor: bordo }}
                        >
                            <img src={`/img/corsi/${pagina.image}`} alt={pagina.titolo} />
                            <div className="card-dati">
                                <h3>{pagina.titolo}</h3>
                                <a
                                    href={`/corso/${pagina.id}`}
                                    className="btn-more"
                                    style={{ "--corso-color": bordo, color: bordo }}
                                >
                                    Leggi di più
                                </a>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}

// card del singolo corso, cosa deve avere:
// contorno con colore corso -> prendere la logica del carosello
// tasto per leggere di più -> porta agli articoli di quella categoria
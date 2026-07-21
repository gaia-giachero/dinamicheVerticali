// per stabilire se è mobile così da caricare successivamente la schermata del calendario giusta
let isMobile = window.matchMedia("(max-width: 767px)").matches;

// evento per il caricamento del calendario 
document.addEventListener("DOMContentLoaded", function () {
    let calendarEl = document.getElementById("calendar");
    if (!calendarEl) return;

    // mappa colori per tipologia di corso
    let colori = {
        "PTI": "#212529",
        "Spazi Confinati": "#EA5C0C",
        "IRATA": "#33658A",
        "ITRA": "#D97706",
        "Corsi Accreditati": "#17BEBB",
        "Lavori in Quota": "#FFCD09",
        "Fune Italia": "#3DB876",
        "GWO": "#EF546C",
    };

    // oggetto per i corsi
    let corsi = [
        { titolo: "Revisioni Periodiche DPI Petzl", tipologia: "PTI", start: "2026-07-22", end: "2026-07-25", durata: "21 ore (3 giorni)" },
        { titolo: "Formazione ed Addestramento ai Sistemi di Accesso e Salvataggio in Spazi Confinati", tipologia: "Spazi Confinati", start: "2026-07-27", durata: "12 ore" },
        { titolo: "Certificazione IRATA L1/L2/L3", tipologia: "IRATA", start: "2026-08-31", end: "2026-09-05", durata: "4 gg + 1 gg esame" },
        { titolo: "Aggiornamento Revisioni Periodiche DPI Petzl", tipologia: "PTI", start: "2026-09-08", durata: "8 ore (1 giorno)" },
        { titolo: "ITRA", tipologia: "ITRA", start: "2026-09-07", end: "2026-09-12", durata: "4 gg + 1 gg esame" },
        { titolo: "Revisioni Periodiche DPI Petzl", tipologia: "PTI", start: "2026-09-09", end: "2026-09-12", durata: "21 ore (3 giorni)" },
        { titolo: "Certificazione IRATA L1/L2/L3", tipologia: "IRATA", start: "2026-09-21", end: "2026-09-26", durata: "4 gg + 1 gg esame" },
        { titolo: "Formazione Formatori e Istruttori DPI Anticaduta", tipologia: "Corsi Accreditati", start: "2026-09-14", end: "2026-09-16", durata: "16 ore (2 giorni)" },
        { titolo: "Modulo Rivenditori PRO Liv. 1", tipologia: "PTI", start: "2026-09-22", durata: "8 ore (1 giorno)" },
        { titolo: "Modulo Rivenditori PRO Liv. 2", tipologia: "PTI", start: "2026-09-23", durata: "8 ore (1 giorno)" },
        { titolo: "Formazione ed Addestramento ai DPI III Categoria", tipologia: "Lavori in Quota", start: "2026-09-22", end: "2026-09-24", durata: "16 ore (2 giorni)" },
        { titolo: "Modulo Rivenditori PRO Liv. 3", tipologia: "PTI", start: "2026-09-24", end: "2026-09-26", durata: "16 ore (2 giorni)" },
        { titolo: "Formazione ed Addestramento ai Sistemi di Accesso e Salvataggio in Spazi Confinati", tipologia: "Spazi Confinati", start: "2026-10-01", durata: "12 ore" },
        { titolo: "Fune - Modulo A", tipologia: "Fune Italia", start: "2026-09-28", end: "2026-10-02", durata: "32 ore (4 giorni)" },
        { titolo: "Aggiornamento lavoratori addetti ai sistemi di accesso e posizionamento mediante funi", tipologia: "Fune Italia", start: "2026-10-02", durata: "8 ore (1 giorno)" },
        { titolo: "Aggiornamento Revisioni Periodiche DPI Petzl", tipologia: "PTI", start: "2026-10-13", durata: "8 ore (1 giorno)" },
        { titolo: "Preposti con funzioni di sorveglianza dei lavori temporanei in quota mediante funi", tipologia: "Fune Italia", start: "2026-10-02", durata: "8 ore (1 giorno)" },
        { titolo: "Revisioni Periodiche DPI Petzl", tipologia: "PTI", start: "2026-10-14", end: "2026-10-17", durata: "21 ore (3 giorni)" },
        { titolo: "Certificazione IRATA L1/L2/L3", tipologia: "IRATA", start: "2026-10-19", end: "2026-10-24", durata: "4 gg + 1 gg esame" },
        { titolo: "GWO BST (FA+WAH+MH+FAW)", tipologia: "GWO", start: "2026-10-19", end: "2026-10-23", durata: "4 giorni" },
    ];

    // converte i corsi nel formato eventi di FullCalendar
    let events = corsi.map(function (corso) {
        return {
            title: corso.titolo,
            start: corso.start,
            end: corso.end,
            color: colori[corso.tipologia] || "#ccc",
            extendedProps: {
                tipologia: corso.tipologia,
                durata: corso.durata,
            },
        };
    });

    // ============ FILTRI PER CATEGORIA ============
    let slotDesktop = document.getElementById("filtri-slot-desktop");
    let slotMobile = document.getElementById("filtri-slot-mobile");
    let conteggioEl = document.getElementById("conteggio-corsi");
    let mediaMobile = window.matchMedia("(max-width: 900px)");

    // categorie effettivamente presenti tra i corsi (nell'ordine della mappa colori)
    let categorie = Object.keys(colori).filter(function (categoria) {
        return corsi.some(function (corso) {
            return corso.tipologia === categoria;
        });
    });

    // tutte le categorie partono selezionate
    let categorieAttive = new Set(categorie);

    function aggiornaConteggio() {
        let visibili = corsi.filter(function (corso) {
            return categorieAttive.has(corso.tipologia);
        }).length;

        if (conteggioEl) conteggioEl.innerText = visibili;
    }

    function applicaFiltri() {
        calendar.getEvents().forEach(function (evento) {
            let tipologia = evento.extendedProps.tipologia;
            evento.setProp("display", categorieAttive.has(tipologia) ? "auto" : "none");
        });

        aggiornaConteggio();
    }

    let filtriContainer = null;

    function creaFiltri() {
        if (!slotDesktop && !slotMobile) return;

        filtriContainer = document.createElement("aside");
        filtriContainer.className = "filtri-corsi";

        // pulsante "a tendina", visibile solo su mobile (gestito via CSS)
        let toggleMobile = document.createElement("button");
        toggleMobile.type = "button";
        toggleMobile.className = "filtri-mobile-toggle";
        toggleMobile.innerHTML = "Filtra corsi <span class=\"filtri-mobile-freccia\">⌄</span>";
        toggleMobile.addEventListener("click", function () {
            let aperto = filtriContainer.classList.toggle("aperto");
            toggleMobile.setAttribute("aria-expanded", aperto);
        });
        toggleMobile.setAttribute("aria-expanded", "false");
        filtriContainer.appendChild(toggleMobile);

        // corpo dei filtri: nascosto su mobile finché non si apre la tendina
        let corpo = document.createElement("div");
        corpo.className = "filtri-corpo";
        filtriContainer.appendChild(corpo);

        let titolo = document.createElement("h3");
        titolo.className = "filtri-titolo";
        titolo.innerText = "Filtra per corso";
        corpo.appendChild(titolo);

        let toggleTutti = document.createElement("button");
        toggleTutti.type = "button";
        toggleTutti.className = "filtri-toggle-tutti";
        toggleTutti.innerText = "Deseleziona tutti";
        corpo.appendChild(toggleTutti);

        let lista = document.createElement("ul");
        lista.className = "filtri-lista";
        corpo.appendChild(lista);

        categorie.forEach(function (categoria) {
            let voce = document.createElement("li");
            voce.className = "filtro-voce";

            let label = document.createElement("label");

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = true;
            checkbox.value = categoria;

            let pallino = document.createElement("span");
            pallino.className = "filtro-pallino";
            pallino.style.backgroundColor = colori[categoria] || "#ccc";

            let testo = document.createElement("span");
            testo.className = "filtro-testo";
            testo.innerText = categoria;

            checkbox.addEventListener("change", function () {
                if (checkbox.checked) {
                    categorieAttive.add(categoria);
                } else {
                    categorieAttive.delete(categoria);
                }

                aggiornaTestoToggle();
                applicaFiltri();
            });

            label.appendChild(checkbox);
            label.appendChild(pallino);
            label.appendChild(testo);
            voce.appendChild(label);
            lista.appendChild(voce);
        });

        function aggiornaTestoToggle() {
            let tutteSelezionate = categorieAttive.size === categorie.length;
            toggleTutti.innerText = tutteSelezionate ? "Deseleziona tutti" : "Seleziona tutti";
        }

        toggleTutti.addEventListener("click", function () {
            let tutteSelezionate = categorieAttive.size === categorie.length;

            categorieAttive = tutteSelezionate ? new Set() : new Set(categorie);

            lista.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
                checkbox.checked = !tutteSelezionate;
            });

            aggiornaTestoToggle();
            applicaFiltri();
        });

        posizionaFiltri();
    }

    // sposta il blocco filtri nello slot giusto in base alla larghezza schermo
    function posizionaFiltri() {
        if (!filtriContainer) return;

        let slot = mediaMobile.matches ? slotMobile : slotDesktop;
        if (slot) slot.appendChild(filtriContainer);
    }

    mediaMobile.addEventListener("change", posizionaFiltri);

    let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: "it",
        firstDay: 1,
        height: "auto",
        initialView: isMobile ? "listMonth" : "dayGridMonth",
        headerToolbar: {
            left: "title",
            right: "dayGridMonth,listMonth prev,next",
        },
        buttonText: { today: "oggi", month: "mese", list: "lista" },
        events: events,
        eventContent: function (arg) {
            let wrapper = document.createElement("div");

            let titolo = document.createElement("div");
            titolo.innerText = arg.event.title;
            titolo.style.fontWeight = "bold";
            wrapper.appendChild(titolo);

            if (arg.event.extendedProps.tipologia) {
                let tipologia = document.createElement("div");
                tipologia.innerText = arg.event.extendedProps.tipologia;
                tipologia.style.fontSize = "0.7rem";
                tipologia.style.opacity = "0.85";
                wrapper.appendChild(tipologia);
            }

            return { domNodes: [wrapper] };
        },
    });

    calendar.render();

    creaFiltri();
    aggiornaConteggio();
});
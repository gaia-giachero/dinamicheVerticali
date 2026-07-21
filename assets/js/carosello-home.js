document.addEventListener("DOMContentLoaded", function () {
  let caroselli = document.querySelectorAll(".carosello");

  caroselli.forEach(function (carosello) {
    inizializzaCarosello(carosello);
  });

  function inizializzaCarosello(carosello) {
    let track = carosello.querySelector(".carosello-track");
    let slides = Array.prototype.slice.call(carosello.querySelectorAll(".carosello-slide"));
    let btnPrev = carosello.querySelector(".carosello-prev");
    let btnNext = carosello.querySelector(".carosello-next");
    let dotsContainer = carosello.querySelector(".carosello-dots");

    if (!track || slides.length === 0) return;

    let numeroSlide = slides.length;
    let indiceCorrente = 0;

    let intervalloAutoplay = parseInt(carosello.dataset.autoplay, 10) || 0;
    let timerAutoplay = null;

    // ============ DOTS (generati dinamicamente) ============
    let dots = [];

    if (dotsContainer) {
      slides.forEach(function (_, indice) {
        let dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carosello-dot";
        dot.setAttribute("aria-label", "Vai all'immagine " + (indice + 1));

        dot.addEventListener("click", function () {
          vaiA(indice);
          riavviaAutoplay();
        });

        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    function aggiornaDots() {
      dots.forEach(function (dot, indice) {
        dot.classList.toggle("attivo", indice === indiceCorrente);
      });
    }

    // ============ NAVIGAZIONE ============
    function vaiA(indice, animato) {
      indiceCorrente = ((indice % numeroSlide) + numeroSlide) % numeroSlide; // wrap-around sicuro anche con indici negativi

      track.style.transition = animato === false ? "none" : "transform 0.45s ease";
      track.style.transform = "translateX(-" + indiceCorrente * 100 + "%)";

      aggiornaDots();
    }

    function successivo() {
      vaiA(indiceCorrente + 1);
    }

    function precedente() {
      vaiA(indiceCorrente - 1);
    }

    if (btnNext) btnNext.addEventListener("click", function () {
      successivo();
      riavviaAutoplay();
    });

    if (btnPrev) btnPrev.addEventListener("click", function () {
      precedente();
      riavviaAutoplay();
    });

    // ============ AUTOPLAY ============
    function avviaAutoplay() {
      if (!intervalloAutoplay) return;
      timerAutoplay = setInterval(successivo, intervalloAutoplay);
    }

    function fermaAutoplay() {
      if (timerAutoplay) clearInterval(timerAutoplay);
    }

    function riavviaAutoplay() {
      fermaAutoplay();
      avviaAutoplay();
    }

    carosello.addEventListener("mouseenter", fermaAutoplay);
    carosello.addEventListener("mouseleave", avviaAutoplay);

    // ============ DRAG / SWIPE ============
    let inTrascinamento = false;
    let puntoIniziale = 0;
    let spostamentoPercentuale = 0;

    track.addEventListener("pointerdown", function (evento) {
      inTrascinamento = true;
      puntoIniziale = evento.clientX;
      track.setPointerCapture(evento.pointerId);
      track.classList.add("trascinamento");
      track.style.transition = "none";
      fermaAutoplay();
    });

    track.addEventListener("pointermove", function (evento) {
      if (!inTrascinamento) return;

      let deltaPx = evento.clientX - puntoIniziale;
      let deltaPercentuale = (deltaPx / carosello.clientWidth) * 100;

      spostamentoPercentuale = deltaPercentuale;

      track.style.transform =
        "translateX(calc(-" + indiceCorrente * 100 + "% + " + deltaPercentuale + "%))";
    });

    function terminaTrascinamento() {
      if (!inTrascinamento) return;
      inTrascinamento = false;
      track.classList.remove("trascinamento");

      let soglia = 15;

      if (spostamentoPercentuale <= -soglia) {
        successivo();
      } else if (spostamentoPercentuale >= soglia) {
        precedente();
      } else {
        vaiA(indiceCorrente); 
      }

      spostamentoPercentuale = 0;
      avviaAutoplay();
    }

    track.addEventListener("pointerup", terminaTrascinamento);
    track.addEventListener("pointercancel", terminaTrascinamento);

    // ============ TASTIERA (accessibilità) ============
    carosello.setAttribute("tabindex", "0");

    carosello.addEventListener("keydown", function (evento) {
      if (evento.key === "ArrowRight") {
        successivo();
        riavviaAutoplay();
      } else if (evento.key === "ArrowLeft") {
        precedente();
        riavviaAutoplay();
      }
    });

    // ============ STATO INIZIALE ============
    vaiA(0, false);
    avviaAutoplay();
  }
});
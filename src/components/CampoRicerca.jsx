import { useState } from "react";

export default function CampoRicerca({id, children, ref, ...props}) {
  const[input, setInput] = useState("");

  function handleChangeInput(i) {
    setInput(i.target.value);
  }

  return (
    <div>
      <input id={id} type="text" value={input} onChange={handleChangeInput} ref={ref} placeholder="Cerca l'articolo che fa per te" className="outline-none w-full" />
      {children}
    </div>
  );
}

// il campo di ricerca deve effettuare una ricerca 
// e deve dare un risultato se la parola inserita è presente nei RIFERIMENTI dell'articolo 
// altrimenti da un messaggio di errore tipo: "Nessuna corrispondenza con il campo inserito!"
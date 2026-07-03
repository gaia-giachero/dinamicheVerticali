import { useState } from "react";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>
        Corsi
      </button>

      {open && (
        <div>
          <p>Sicurezza</p>
          <p>Antincendio</p>
        </div>
      )}
    </div>
  );
}
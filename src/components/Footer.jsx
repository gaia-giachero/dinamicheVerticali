// footer contenente logo con info affianco i contatti e sotto le aziende
import "../../assets/style/style-footer.css";

export default function Footer() {
    return (
        <>
            <div className="firstSection">
                <img src="/img/privacy&policy.svg" alt="dinamiche verticali formazione" loading="lazy" />
                <div className="contatti">
                    <p>Contattaci</p>
                    <p>+39 011 27 32 500</p>
                    <p>(Lun-Ven dalle 08:30 alle 17:30)</p>
                    <p>formazione@petzl.it</p>
                    <p>Via G. Battista Feroggio, 54, 10151 Torino</p>
                </div>
            </div>
            <img src="/img/aziende.svg" alt="petzl, irata, gwo" loading="lazy" />
        </>
    );
}

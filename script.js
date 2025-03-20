document.addEventListener('DOMContentLoaded', () => {
    const eintragsListe = document.getElementById('eintragsListe');
    const hinzufügenKnopf = document.getElementById('hinzufügen');
    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    const bearbeitenKnopf = document.getElementById('bearbeiten');
    const löschenKnopf = document.getElementById('löschen');
    const fertigKnopf = document.getElementById('fertig');

    const erstelleEintrag = (text) => {
        const eintrag = document.createElement('div');
        eintrag.className = 'eintrag';

        const kontrollkästchen = document.createElement('input');
        kontrollkästchen.type = 'checkbox';

        const beschriftung = document.createElement('label');
        beschriftung.textContent = text;

        eintrag.appendChild(kontrollkästchen);
        eintrag.appendChild(beschriftung);
        eintragsListe.appendChild(eintrag);
    };

    const holeAusgewählteEinträge = () => {
        return Array.from(document.querySelectorAll('.eintrag'))
            .filter(eintrag => eintrag.querySelector('input[type="checkbox"]').checked);
    };

    hinzufügenKnopf.addEventListener('click', () => {
        const eintragText = neuerEintragEingabe.value;
        if (eintragText) {
            erstelleEintrag(eintragText);
            neuerEintragEingabe.value = '';
        }
    });

    bearbeitenKnopf.addEventListener('click', () => {
        const ausgewählteEinträge = holeAusgewählteEinträge();
        if (ausgewählteEinträge.length > 0) {
            const beschriftung = ausgewählteEinträge[0].querySelector('label');
            const neuerText = neuerEintragEingabe.value;
            if (neuerText) {
                beschriftung.textContent = neuerText;
                neuerEintragEingabe.value = '';
            }
            ausgewählteEinträge[0].querySelector('input[type="checkbox"]').checked = false;
        }
    });

    fertigKnopf.addEventListener('click', () => {
        holeAusgewählteEinträge().forEach(eintrag => {
            eintrag.style.textDecoration = 'line-through';
        });
    });

    löschenKnopf.addEventListener('click', () => {
        holeAusgewählteEinträge().forEach(eintrag => {
            eintragsListe.removeChild(eintrag);
        });
    });
});
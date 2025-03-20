document.addEventListener('DOMContentLoaded', () => {
    const eintragsListe = document.getElementById('eintragsListe');
    const hinzufügenKnopf = document.getElementById('hinzufügen');
    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    const bearbeitenKnopf = document.getElementById('bearbeiten');
    const löschenKnopf = document.getElementById('löschen');
    const fertigKnopf = document.getElementById('fertig');

    const speichereEinträge = (einträge) => {
        localStorage.setItem('einträge', JSON.stringify(einträge));
    };

    const ladeEinträge = () => {
        const gespeicherteEinträge = localStorage.getItem('einträge');
        return gespeicherteEinträge ? JSON.parse(gespeicherteEinträge) : [];
    };

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

    const aktualisiereAnzeige = () => {
        eintragsListe.innerHTML = '';
        const einträge = ladeEinträge();
        einträge.forEach(eintrag => erstelleEintrag(eintrag.text));
    };

    const holeAusgewählteEinträge = () => {
        return Array.from(document.querySelectorAll('.eintrag'))
            .filter(eintrag => eintrag.querySelector('input[type="checkbox"]').checked);
    };

    hinzufügenKnopf.addEventListener('click', () => {
        const eintragText = neuerEintragEingabe.value;
        if (eintragText) {
            const einträge = ladeEinträge();
            einträge.push({ text: eintragText });
            speichereEinträge(einträge);
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
                const einträge = ladeEinträge();
                const index = einträge.findIndex(eintrag => eintrag.text === beschriftung.textContent);
                if (index !== -1) {
                    einträge[index].text = neuerText;
                    speichereEinträge(einträge);
                }
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
        const einträge = ladeEinträge();
        holeAusgewählteEinträge().forEach(eintrag => {
            const beschriftung = eintrag.querySelector('label').textContent;
            const index = einträge.findIndex(e => e.text === beschriftung);
            if (index !== -1) {
                einträge.splice(index, 1);
                eintragsListe.removeChild(eintrag);
            }
        });
        speichereEinträge(einträge);
    });

    aktualisiereAnzeige();
});
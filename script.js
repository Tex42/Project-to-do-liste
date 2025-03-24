document.addEventListener('DOMContentLoaded', () => {
    const eintragsListe = document.getElementById('eintragsListe');
    const hinzufügenKnopf = document.getElementById('hinzufügen');
    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    const bearbeitenKnopf = document.getElementById('bearbeiten');
    const löschenKnopf = document.getElementById('löschen');
    const fertigKnopf = document.getElementById('fertig');

    const speichereEinträge = (einträge) => localStorage.setItem('todoListe', JSON.stringify(einträge));
    const ladeEinträge = () => JSON.parse(localStorage.getItem('todoListe')) || [];

    const erstelleEintrag = (text, checked = false, durchgestrichen = false) => {
        const eintrag = document.createElement('div');
        eintrag.className = 'eintrag';

        const kontrollkästchen = document.createElement('input');
        kontrollkästchen.type = 'checkbox';
        kontrollkästchen.checked = checked;

        const beschriftung = document.createElement('label');
        beschriftung.textContent = text;
        beschriftung.style.textDecoration = durchgestrichen ? 'line-through' : 'none';

        eintrag.appendChild(kontrollkästchen);
        eintrag.appendChild(beschriftung);
        eintragsListe.appendChild(eintrag);

        kontrollkästchen.addEventListener('change', () => {
            const einträge = ladeEinträge();
            const index = einträge.findIndex(e => e.text === text);
            if (index !== -1) {
                einträge[index].checked = kontrollkästchen.checked;
                speichereEinträge(einträge);
            }
        });
    };

    const aktualisiereAnzeige = () => {
        eintragsListe.innerHTML = '';
        ladeEinträge().forEach(eintrag => erstelleEintrag(eintrag.text, eintrag.checked, eintrag.durchgestrichen));
    };

    const holeAusgewählteEinträge = () => {
        return Array.from(document.querySelectorAll('.eintrag'))
            .filter(eintrag => eintrag.querySelector('input[type="checkbox"]').checked);
    };

    hinzufügenKnopf.addEventListener('click', () => {
        const eintragText = neuerEintragEingabe.value;
        if (eintragText) {
            const einträge = ladeEinträge();
            einträge.push({ text: eintragText, checked: false, durchgestrichen: false });
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
                const index = einträge.findIndex(e => e.text === beschriftung.textContent);
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
        const einträge = ladeEinträge();
        holeAusgewählteEinträge().forEach(eintrag => {
            const beschriftung = eintrag.querySelector('label');
            const index = einträge.findIndex(e => e.text === beschriftung.textContent);
            if (index !== -1) {
                einträge[index].durchgestrichen = !einträge[index].durchgestrichen;
                speichereEinträge(einträge);
                beschriftung.style.textDecoration = einträge[index].durchgestrichen ? 'line-through' : 'none';
            }
        });
    });

    löschenKnopf.addEventListener('click', () => {
        let einträge = ladeEinträge();
        holeAusgewählteEinträge().forEach(eintrag => {
            const beschriftung = eintrag.querySelector('label').textContent;
            einträge = einträge.filter(e => e.text !== beschriftung);
            eintragsListe.removeChild(eintrag);
        });
        speichereEinträge(einträge);
    });

    aktualisiereAnzeige();
});
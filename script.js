document.addEventListener('DOMContentLoaded', () => {
    const kasten = document.querySelector('.kasten');
    const hinzufügenKnopf = document.getElementById('hinzufügen');
    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    const bearbeitenKnopf = document.getElementById('bearbeiten');
    const löschenKnopf = document.getElementById('löschen');
    const fertigKnopf = document.getElementById('fertig');

    let zuBearbeitenderEintrag = null;

    const erstelleEintrag = (text) => {
        const eintrag = document.createElement('div');
        eintrag.className = 'eintrag';

        const kontrollkästchen = document.createElement('input');
        kontrollkästchen.type = 'checkbox';

        const beschriftung = document.createElement('label');
        beschriftung.textContent = text;

        eintrag.appendChild(kontrollkästchen);
        eintrag.appendChild(beschriftung);
        kasten.appendChild(eintrag);
    };

    hinzufügenKnopf.addEventListener('click', () => {
        const eintragText = neuerEintragEingabe.value;
        if (eintragText) {
            erstelleEintrag(eintragText);
            neuerEintragEingabe.value = '';
        }
    });

    bearbeitenKnopf.addEventListener('click', () => {
        const einträge = document.querySelectorAll('.eintrag');
        einträge.forEach(eintrag => {
            const kontrollkästchen = eintrag.querySelector('input[type="checkbox"]');
            if (kontrollkästchen.checked) {
                const beschriftung = eintrag.querySelector('label');
                neuerEintragEingabe.value = beschriftung.textContent;
                zuBearbeitenderEintrag = eintrag;
                kontrollkästchen.checked = false;
            }
        });
    });

    fertigKnopf.addEventListener('click', () => {
        if (zuBearbeitenderEintrag) {
            const beschriftung = zuBearbeitenderEintrag.querySelector('label');
            const neuerText = neuerEintragEingabe.value;
            if (neuerText) {
                beschriftung.textContent = neuerText;
                neuerEintragEingabe.value = '';
                zuBearbeitenderEintrag = null;
            }
        } else {
            const einträge = document.querySelectorAll('.eintrag');
            einträge.forEach(eintrag => {
                const kontrollkästchen = eintrag.querySelector('input[type="checkbox"]');
                if (kontrollkästchen.checked) {
                    eintrag.style.textDecoration = 'line-through';
                } else {
                    eintrag.style.textDecoration = 'none';
                }
            });
        }
    });

    löschenKnopf.addEventListener('click', () => {
        const einträge = document.querySelectorAll('.eintrag');
        einträge.forEach(eintrag => {
            const kontrollkästchen = eintrag.querySelector('input[type="checkbox"]');
            if (kontrollkästchen.checked) {
                kasten.removeChild(eintrag);
            }
        });
    });
});
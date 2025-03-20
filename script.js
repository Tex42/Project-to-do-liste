document.addEventListener('DOMContentLoaded', () => {
    // Holen der HTML-Elemente
    const eintragsListe = document.getElementById('eintragsListe'); // Das Element, das die Liste der Einträge enthält
    const hinzufügenKnopf = document.getElementById('hinzufügen'); // Der Knopf zum Hinzufügen neuer Einträge
    const neuerEintragEingabe = document.getElementById('neuerEintrag'); // Das Eingabefeld für neue Einträge
    const bearbeitenKnopf = document.getElementById('bearbeiten'); // Der Knopf zum Bearbeiten ausgewählter Einträge
    const löschenKnopf = document.getElementById('löschen'); // Der Knopf zum Löschen ausgewählter Einträge
    const fertigKnopf = document.getElementById('fertig'); // Der Knopf zum Markieren ausgewählter Einträge als erledigt

    // Funktion zum Erstellen eines neuen Eintrags
    const erstelleEintrag = (text) => {
        const eintrag = document.createElement('div'); // Erstellen eines neuen div-Elements für den Eintrag
        eintrag.className = 'eintrag'; // Hinzufügen einer Klasse zum Eintrag

        const kontrollkästchen = document.createElement('input'); // Erstellen eines neuen input-Elements für das Kontrollkästchen
        kontrollkästchen.type = 'checkbox'; // Setzen des Typs des input-Elements auf "checkbox"

        const beschriftung = document.createElement('label'); // Erstellen eines neuen label-Elements für die Beschriftung
        beschriftung.textContent = text; // Setzen des Textinhalts der Beschriftung auf den übergebenen Text

        eintrag.appendChild(kontrollkästchen); // Hinzufügen des Kontrollkästchens zum Eintrag
        eintrag.appendChild(beschriftung); // Hinzufügen der Beschriftung zum Eintrag
        eintragsListe.appendChild(eintrag); // Hinzufügen des Eintrags zur Liste der Einträge
    };

    // Funktion zum Holen der ausgewählten Einträge
    const holeAusgewählteEinträge = () => {
        return Array.from(document.querySelectorAll('.eintrag')) // Erstellen eines Arrays aus allen Elementen mit der Klasse "eintrag"
            .filter(eintrag => eintrag.querySelector('input[type="checkbox"]').checked); // Filtern der Einträge, die ausgewählt sind (Kontrollkästchen ist aktiviert)
    };

    // Event-Listener für den Hinzufügen-Knopf
    hinzufügenKnopf.addEventListener('click', () => {
        const eintragText = neuerEintragEingabe.value; // Holen des Textes aus dem Eingabefeld
        if (eintragText) { // Überprüfen, ob das Eingabefeld nicht leer ist
            erstelleEintrag(eintragText); // Erstellen eines neuen Eintrags mit dem Text aus dem Eingabefeld
            neuerEintragEingabe.value = ''; // Leeren des Eingabefelds
        }
    });

    // Event-Listener für den Bearbeiten-Knopf
    bearbeitenKnopf.addEventListener('click', () => {
        const ausgewählteEinträge = holeAusgewählteEinträge(); // Holen der ausgewählten Einträge
        if (ausgewählteEinträge.length > 0) { // Überprüfen, ob mindestens ein Eintrag ausgewählt ist
            const beschriftung = ausgewählteEinträge[0].querySelector('label'); // Holen der Beschriftung des ersten ausgewählten Eintrags
            const neuerText = neuerEintragEingabe.value; // Holen des neuen Textes aus dem Eingabefeld
            if (neuerText) { // Überprüfen, ob das Eingabefeld nicht leer ist
                beschriftung.textContent = neuerText; // Setzen des Textinhalts der Beschriftung auf den neuen Text
                neuerEintragEingabe.value = ''; // Leeren des Eingabefelds
            }
            ausgewählteEinträge[0].querySelector('input[type="checkbox"]').checked = false; // Deaktivieren des Kontrollkästchens des ersten ausgewählten Eintrags
        }
    });

    // Event-Listener für den Fertig-Knopf
    fertigKnopf.addEventListener('click', () => {
        holeAusgewählteEinträge().forEach(eintrag => { // Für jeden ausgewählten Eintrag
            eintrag.style.textDecoration = 'line-through'; // Durchstreichen des Textes des Eintrags
        });
    });

    // Event-Listener für den Löschen-Knopf
    löschenKnopf.addEventListener('click', () => {
        holeAusgewählteEinträge().forEach(eintrag => { // Für jeden ausgewählten Eintrag
            eintragsListe.removeChild(eintrag); // Entfernen des Eintrags aus der Liste
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Wartet darauf, dass das DOM vollständig geladen ist, bevor der Code ausgeführt wird.

    const eintragsListe = document.getElementById('eintragsListe');
    // Holt das HTML-Element mit der ID 'eintragsListe' und speichert es in der Variable 'eintragsListe'.

    const hinzufügenKnopf = document.getElementById('hinzufügen');
    // Holt das HTML-Element mit der ID 'hinzufügen' und speichert es in der Variable 'hinzufügenKnopf'.

    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    // Holt das HTML-Element mit der ID 'neuerEintrag' und speichert es in der Variable 'neuerEintragEingabe'.

    const löschenKnopf = document.getElementById('löschen');
    // Holt das HTML-Element mit der ID 'löschen' und speichert es in der Variable 'löschenKnopf'.

    const bearbeitenKnopf = document.getElementById('bearbeiten');
    // Holt das HTML-Element mit der ID 'bearbeiten' und speichert es in der Variable 'bearbeitenKnopf'.

    const fertigKnopf = document.getElementById('fertig');
    // Holt das HTML-Element mit der ID 'fertig' und speichert es in der Variable 'fertigKnopf'.

    const speichereEinträge = (einträge) => {
        // Definiert eine Funktion 'speichereEinträge', die das Array 'einträge' als Parameter nimmt.
        localStorage.setItem('todoListe', JSON.stringify(einträge));
        // Speichert das Array 'einträge' als JSON-String im Local Storage unter dem Schlüssel 'todoListe'.
    };

    const ladeEinträge = () => {
        // Definiert eine Funktion 'ladeEinträge', die keine Parameter hat.
        return JSON.parse(localStorage.getItem('todoListe')) || [];
        // Lädt den JSON-String aus dem Local Storage unter dem Schlüssel 'todoListe', parst ihn in ein Array und gibt dieses Array zurück. Wenn nichts gefunden wird, wird ein leeres Array zurückgegeben.
    };

    const aktualisiereAnzeige = () => {
        // Definiert eine Funktion 'aktualisiereAnzeige', die keine Parameter hat.
        eintragsListe.innerHTML = '';
        // Leert den Inhalt des HTML-Elements 'eintragsListe'.

        ladeEinträge().forEach((eintrag, index) => {
            // Iteriert über jedes Element im Array, das von 'ladeEinträge' zurückgegeben wird. 'eintrag' ist das aktuelle Element und 'index' ist der Index des aktuellen Elements.

            const eintragElement = document.createElement('li');
            // Erstellt ein neues 'li'-Element und speichert es in der Variable 'eintragElement'.

            eintragElement.className = 'eintrag';
            // Setzt die Klasse des 'li'-Elements auf 'eintrag'.

            const kontrollKaestchen = document.createElement('input');
            // Erstellt ein neues 'input'-Element und speichert es in der Variable 'kontrollKaestchen'.

            kontrollKaestchen.type = 'checkbox';
            // Setzt den Typ des 'input'-Elements auf 'checkbox'.

            kontrollKaestchen.checked = eintrag.abgehackt;
            // Setzt den 'checked'-Status des Kontrollkästchens basierend auf dem 'abgehackt'-Status des aktuellen Eintrags.

            const beschriftung = document.createElement('label');
            // Erstellt ein neues 'label'-Element und speichert es in der Variable 'beschriftung'.

            beschriftung.textContent = eintrag.text;
            // Setzt den Textinhalt des 'label'-Elements auf den Text des aktuellen Eintrags.

            beschriftung.style.textDecoration = eintrag.durchgestrichen ? 'line-through' : 'none';
            // Setzt die Textdekoration des 'label'-Elements basierend auf dem 'durchgestrichen'-Status des aktuellen Eintrags.

            kontrollKaestchen.addEventListener('change', () => {
                // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn sich der 'checked'-Status des Kontrollkästchens ändert.

                const einträge = ladeEinträge();
                // Lädt die Einträge aus dem Local Storage und speichert sie in der Variable 'einträge'.

                einträge[index].abgehackt = kontrollKaestchen.checked;
                // Setzt den 'abgehackt'-Status des aktuellen Eintrags basierend auf dem 'checked'-Status des Kontrollkästchens.

                speichereEinträge(einträge);
                // Speichert die aktualisierten Einträge im Local Storage.
            });

            eintragElement.append(kontrollKaestchen, beschriftung);
            // Fügt das Kontrollkästchen und die Beschriftung als Kinder zum 'li'-Element hinzu.

            eintragsListe.appendChild(eintragElement);
            // Fügt das 'li'-Element als Kind zur 'eintragsListe' hinzu.
        });
    };

    hinzufügenKnopf.addEventListener('click', () => {
        // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn der 'hinzufügen'-Knopf geklickt wird.

        const text = neuerEintragEingabe.value.trim();
        // Holt den Wert des Eingabefelds 'neuerEintragEingabe', entfernt führende und nachfolgende Leerzeichen und speichert ihn in der Variable 'text'.

        if (!text) return;
        // Wenn der Text leer ist, wird die Funktion beendet.

        const einträge = ladeEinträge();
        // Lädt die Einträge aus dem Local Storage und speichert sie in der Variable 'einträge'.

        einträge.push({ text, abgehackt: false, durchgestrichen: false });
        // Fügt einen neuen Eintrag zum Array 'einträge' hinzu. Der neue Eintrag hat den Text aus dem Eingabefeld und die Eigenschaften 'abgehackt' und 'durchgestrichen' sind auf 'false' gesetzt.

        speichereEinträge(einträge);
        // Speichert die aktualisierten Einträge im Local Storage.

        aktualisiereAnzeige();
        // Aktualisiert die Anzeige der Einträge.

        neuerEintragEingabe.value = '';
        // Leert das Eingabefeld 'neuerEintragEingabe'.

        neuerEintragEingabe.focus();
        // Setzt den Fokus auf das Eingabefeld 'neuerEintragEingabe'.
    });

    löschenKnopf.addEventListener('click', () => {
        // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn der 'löschen'-Knopf geklickt wird.

        const einträge = ladeEinträge().filter(eintrag => !eintrag.abgehackt);
        // Lädt die Einträge aus dem Local Storage, filtert die abgehakten Einträge heraus und speichert die verbleibenden Einträge in der Variable 'einträge'.

        speichereEinträge(einträge);
        // Speichert die gefilterten Einträge im Local Storage.

        aktualisiereAnzeige();
        // Aktualisiert die Anzeige der Einträge.
    });

    bearbeitenKnopf.addEventListener('click', () => {
        // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn der 'bearbeiten'-Knopf geklickt wird.

        const text = neuerEintragEingabe.value.trim();
        // Holt den Wert des Eingabefelds 'neuerEintragEingabe', entfernt führende und nachfolgende Leerzeichen und speichert ihn in der Variable 'text'.

        if (!text) return;
        // Wenn der Text leer ist, wird die Funktion beendet.

        const einträge = ladeEinträge();
        // Lädt die Einträge aus dem Local Storage und speichert sie in der Variable 'einträge'.

        einträge.forEach(eintrag => {
            // Iteriert über jedes Element im Array 'einträge'.

            if (eintrag.abgehackt) {
                // Wenn der Eintrag abgehakt ist, wird der Text des Eintrags auf den neuen Text gesetzt.

                eintrag.text = text;
            }
        });

        speichereEinträge(einträge);
        // Speichert die aktualisierten Einträge im Local Storage.

        aktualisiereAnzeige();
        // Aktualisiert die Anzeige der Einträge.

        neuerEintragEingabe.value = '';
        // Leert das Eingabefeld 'neuerEintragEingabe'.

        neuerEintragEingabe.focus();
        // Setzt den Fokus auf das Eingabefeld 'neuerEintragEingabe'.
    });

    fertigKnopf.addEventListener('click', () => {
        // Fügt einen Event-Listener hinzu, der ausgeführt wird, wenn der 'fertig'-Knopf geklickt wird.

        const einträge = ladeEinträge();
        // Lädt die Einträge aus dem Local Storage und speichert sie in der Variable 'einträge'.

        einträge.forEach(eintrag => {
            // Iteriert über jedes Element im Array 'einträge'.

            if (eintrag.abgehackt) {
                // Wenn der Eintrag abgehakt ist, wird der 'durchgestrichen'-Status des Eintrags umgekehrt.

                eintrag.durchgestrichen = !eintrag.durchgestrichen;
            }
        });

        speichereEinträge(einträge);
        // Speichert die aktualisierten Einträge im Local Storage.

        aktualisiereAnzeige();
        // Aktualisiert die Anzeige der Einträge.
    });

    aktualisiereAnzeige();
    // Initialisiert die Anzeige der Einträge beim Laden der Seite.
});
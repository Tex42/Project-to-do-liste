document.addEventListener('DOMContentLoaded', () => {                       // Wartet darauf, dass das DOM vollständig geladen ist, bevor der Code ausgeführt wird.
    const eintragsListe = document.getElementById('eintragsListe');
    const hinzufügenKnopf = document.getElementById('hinzufügen');
    const neuerEintragEingabe = document.getElementById('neuerEintrag');
    const löschenKnopf = document.getElementById('löschen');
    const bearbeitenKnopf = document.getElementById('bearbeiten');
    const fertigKnopf = document.getElementById('fertig');

    const speichereEinträge = (einträge) => {                               // Definiert eine Funktion 'speichereEinträge', die das Array 'einträge' als Parameter nimmt.
        localStorage.setItem('todoListe', JSON.stringify(einträge));        // Speichert das Array 'einträge' als JSON-String im Local Storage unter dem Schlüssel 'todoListe'.
    };

    const ladeEinträge = () => {                                            // Definiert eine Funktion 'ladeEinträge', die keine Parameter hat.
        return JSON.parse(localStorage.getItem('todoListe')) || [];         // Lädt den JSON-String aus dem Local Storage unter dem Schlüssel 'todoListe', parst ihn in ein Array und gibt dieses Array zurück. Wenn nichts gefunden wird, wird ein leeres Array zurückgegeben.
    };

    const aktualisiereAnzeige = () => {
        eintragsListe.innerHTML = '';
        ladeEinträge().forEach((eintrag, index) => {                        // Iteriert über jedes Element im Array, das von 'ladeEinträge' zurückgegeben wird. 'eintrag' ist das aktuelle Element und 'index' ist der Index des aktuellen Elements.
            const eintragElement = document.createElement('li');
    
            const kontrollKaestchen = document.createElement('input');
            kontrollKaestchen.type = 'checkbox';
            kontrollKaestchen.checked = eintrag.abgehackt;
    
            const beschriftung = document.createElement('label');
            beschriftung.textContent = eintrag.text;
            beschriftung.style.textDecoration = eintrag.durchgestrichen ? 'line-through' : 'none';
    
            kontrollKaestchen.addEventListener('change', () => {
                const einträge = ladeEinträge();
                einträge[index].abgehackt = kontrollKaestchen.checked;
                speichereEinträge(einträge);
            });
    
            eintragElement.append(kontrollKaestchen, beschriftung);
            eintragsListe.appendChild(eintragElement);
        });
    };

    hinzufügenKnopf.addEventListener('click', () => {
        const text = neuerEintragEingabe.value;
        if (!text) return;

        const einträge = ladeEinträge();
        einträge.push({ text, abgehackt: false, durchgestrichen: false });
        speichereEinträge(einträge);                                            // Speichert die aktualisierten Einträge im Local Storage.
        aktualisiereAnzeige();                                                  // Aktualisiert die Anzeige der Einträge.
    });

    löschenKnopf.addEventListener('click', () => {
        const einträge = ladeEinträge().filter(eintrag => !eintrag.abgehackt);  // Lädt die Einträge aus dem Local Storage, filtert die abgehakten Einträge heraus und speichert die verbleibenden Einträge in der Variable 'einträge'.
        speichereEinträge(einträge);
        aktualisiereAnzeige();
    });

    bearbeitenKnopf.addEventListener('click', () => {
        const text = neuerEintragEingabe.value;
        if (!text) return;

        const einträge = ladeEinträge();
        einträge.forEach(eintrag => {
            if (eintrag.abgehackt) {
                eintrag.text = text;
            }
        });
        speichereEinträge(einträge);
        aktualisiereAnzeige();
    });

    fertigKnopf.addEventListener('click', () => {
        const einträge = ladeEinträge();
        einträge.forEach(eintrag => {
            if (eintrag.abgehackt) {                                            // Überprüft, ob der Eintrag abgehakt ist.
                eintrag.durchgestrichen = !eintrag.durchgestrichen;             // Wenn der Eintrag abgehakt ist, wird der 'durchgestrichen'-Status des Eintrags umgekehrt.
            }
        });
        speichereEinträge(einträge);
        aktualisiereAnzeige();
    });

    aktualisiereAnzeige();                                                      // Ruft die Funktion 'aktualisiereAnzeige' auf, um die Anzeige der Einträge zu initialisieren.
});
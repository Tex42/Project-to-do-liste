const eintragsListe = document.getElementById('eintragsListe');
const hinzufügenButton = document.getElementById('hinzufügen');
const Eingabefeld = document.getElementById('neuerEintrag');
const löschenButton = document.getElementById('löschen');
const bearbeitenButton = document.getElementById('bearbeiten');
const fertigButton = document.getElementById('fertig');

const speichereTodoListe = (todoListe) => {                                                     // Funktion speichereTodoListe, nimmt das Array todoListe als Parameter.
    localStorage.setItem('todoListe', JSON.stringify(todoListe));                               // Speichert das Array todoListe als JSON-String im Local Storage mit dem Schlüssel namen todoListe.
};

const ladeTodoListe = () => {                                          
    return JSON.parse(localStorage.getItem('todoListe')) || [];                                 // Lädt den JSON-String aus dem Local Storage mit dem Schlüssel namen todoListe, parst ihn in ein Array und gibt dieses Array zurück. Wenn nichts gefunden wird, wird ein leeres Array zurückgegeben.
};

function speichernUndLaden(todoListe) {
    speichereTodoListe(todoListe);
    aktualisiereAnzeige();
}

// ----------------Meine Aktualisierungs Funktion----------------

const aktualisiereAnzeige = () => {
    eintragsListe.innerHTML = '';
    let todoListe = ladeTodoListe();                                                       // Leert den Inhalt des HTML Elements eintragsListe sonst habe ich doppelte Einträge.
    todoListe.forEach((todoItem) => {                                                   // Hier rufe ich jedes Array mit dem Element (todoItem) und Index (index) auf.
        const eintragElement = document.createElement('li');
    
        const kontrollKasten = document.createElement('input');
        kontrollKasten.type = 'checkbox';                                               // Setzt den Typ des input Elements auf checkbox.
        kontrollKasten.checked = todoItem.abgehakt;                                    // Setzt den checked Status des Kontrollkästchens basierend auf dem abgehakt Status des Eintrags.
    
        const beschriftung = document.createElement('label');
        beschriftung.textContent = todoItem.text;                                                // Setzt den Text des label Elements basierend auf dem Text des aktuellen Eintrags.
        beschriftung.style.textDecoration = todoItem.durchgestrichen ? 'line-through' : 'none';  // Setzt die Textdekoration des label Elements basierend auf dem durchgestrichen Status des Eintrags.
    
        kontrollKasten.addEventListener('change', () => {                               // Hier wird ein EventListener hinzugefügt, der auf Änderungen des Kontrollkästchens reagiert.
            todoItem.abgehakt = kontrollKasten.checked;
            speichereTodoListe(todoListe);
        });

        let durchgestrichen = ladeTodoListe().filter(todoItem => todoItem.durchgestrichen).length;
        zahl.innerText = `${durchgestrichen} von ${ladeTodoListe().length}`;
    
        eintragElement.append(kontrollKasten, beschriftung);                            // Fügt das Kontrollkästchen und die Beschriftung zum Eintragselement hinzu.
        eintragsListe.appendChild(eintragElement);                                      // Fügt das Eintragselement zur Eintragsliste hinzu.
    });
};

// ----------------------------------------------------------Hier sind jetzt meine Buttons----------------------------------------------------------

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && ladeTodoListe().every(todoItem => !todoItem.abgehakt)){
        event.preventDefault();
        hinzufügenButton.click();
        }
    else if (event.key === 'Enter' && ladeTodoListe().some(todoItem => todoItem.abgehakt)){
        event.preventDefault();
        bearbeitenButton.click();
        }
    else if (event.key === 'Delete' && ladeTodoListe().some(todoItem => todoItem.abgehakt)){
        event.preventDefault();
        löschenButton.click();
        }
});

// document.addEventListener('keydown', (event) => {
//     ladeTodoListe().every((todoItem) => {
//     if (event.key === 'Enter' && !todoItem.abgehakt){
//         event.preventDefault();
//         hinzufügenButton.click();
//         }
//     })
// });

hinzufügenButton.addEventListener('click', () => {
    const textHB = Eingabefeld.value;
    if (!textHB) return;

    const itemHB = ladeTodoListe();
    itemHB.push({ text: textHB, abgehakt: false, durchgestrichen: false });
    speichernUndLaden(itemHB);
    Eingabefeld.value = "";
});

löschenButton.addEventListener('click', () => {
    const itemLB = ladeTodoListe().filter(todoItem => !todoItem.abgehakt);               // Lädt die Einträge aus dem Local Storage, filtert die abgehakten Einträge heraus und speichert die verbleibenden Einträge in der Variable 'todoListe'.
    speichernUndLaden(itemLB);
});

bearbeitenButton.addEventListener('click', () => {
    const textBB = Eingabefeld.value;
    if (!textBB) return;

    const itemBB = ladeTodoListe();
    itemBB.forEach(todoItem => {
        if (todoItem.abgehakt) {
            todoItem.text = textBB;
        }
    });
    speichernUndLaden(itemBB);
    Eingabefeld.value = "";
});

fertigButton.addEventListener('click', () => {
    const itemFB = ladeTodoListe();
    itemFB.forEach(todoItem => {
        if (todoItem.abgehakt) {                                                       // Überprüft, ob der Eintrag abgehakt ist.
            todoItem.durchgestrichen = !todoItem.durchgestrichen;                       // Wenn der Eintrag abgehakt ist, wird der durchgestrichen Status des Eintrags umgekehrt.
        }
    });
    speichernUndLaden(itemFB);
});

aktualisiereAnzeige();                                                                  // Ruft die Funktion aktualisiereAnzeige auf, um die Anzeige der Einträge zu initialisieren.
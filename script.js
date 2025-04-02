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
    let todoListe = ladeTodoListe();

    todoListe.forEach((todoItem) => {
        const eintragElement = document.createElement('li');

        const kontrollKasten = document.createElement('input');
        kontrollKasten.type = 'checkbox';
        kontrollKasten.checked = todoItem.abgehakt;

        const beschriftung = document.createElement('label');
        beschriftung.textContent = todoItem.text;
        beschriftung.style.textDecoration = todoItem.durchgestrichen ? 'line-through' : 'none';

        kontrollKasten.addEventListener('change', () => {
            todoItem.abgehakt = kontrollKasten.checked;
            speichereTodoListe(todoListe);
        });

        const speichernButton = document.createElement('button');
        speichernButton.innerText = 'Speichern';
        speichernButton.style.display = 'none';

        const abbrechenButton = document.createElement('button');
        abbrechenButton.innerText = 'Abbrechen';
        abbrechenButton.style.display = 'none';

        bearbeitenButton.addEventListener('click', () => {
            if (todoItem.abgehakt) {
                speichernButton.style.display = 'block';
                abbrechenButton.style.display = 'block';
                Eingabefeld.value = todoItem.text;
            }
        });

        speichernButton.addEventListener('click', () => {
            const textBB = Eingabefeld.value;
            if (!textBB) return;

            todoItem.text = textBB;
            speichereTodoListe(todoListe);
            Eingabefeld.value = '';
            speichernButton.style.display = 'none';
            abbrechenButton.style.display = 'none';
            aktualisiereAnzeige();
        });

        abbrechenButton.addEventListener('click', () => {
            speichernButton.style.display = 'none';
            abbrechenButton.style.display = 'none';
            Eingabefeld.value = '';
        });

        eintragElement.append(kontrollKasten, beschriftung, speichernButton, abbrechenButton);
        eintragsListe.appendChild(eintragElement);
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

// bearbeitenButton.addEventListener('click', () => {
//     ladeTodoListe().forEach(todoItem => {
//         if (todoItem.abgehakt) {
//             speichernButton.style.display = 'block';
//             abbrechenButton.style.display = 'block';
//             Eingabefeld.value = todoItem.text;
//         }
//     });
// });

fertigButton.addEventListener('click', () => {
    const itemFB = ladeTodoListe();
    itemFB.forEach(todoItem => {
        if (todoItem.abgehakt) {                                                       // Überprüft, ob der Eintrag abgehakt ist.
            todoItem.durchgestrichen = !todoItem.durchgestrichen;                       // Wenn der Eintrag abgehakt ist, wird der durchgestrichen Status des Eintrags umgekehrt.
        }
    });
    speichernUndLaden(itemFB);
});

// speichernButton.addEventListener('click', () => {
//     const textBB = Eingabefeld.value;
//     if (!textBB) return;

//     const itemBB = ladeTodoListe();
//     itemBB.forEach(todoItem => {
//         if (todoItem.abgehakt) {
//             todoItem.text = textBB;
//         }
//     });
//     speichernUndLaden(itemBB);
//     Eingabefeld.value = "";
// });

// abbrechenButton.addEventListener('click', () => {
//     speichernButton.style.display = 'none';
//     abbrechenButton.style.display = 'none';
//     Eingabefeld.value = "";
// });

// window.addEventListener('DOMContentLoaded', () => {
//     speichernButton.style.display = 'none';
//     abbrechenButton.style.display = 'none';
// });

aktualisiereAnzeige();
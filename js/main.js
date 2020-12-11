// 1.  Fdeladat: Az alkalmazás localStorage-ben tárolja a teendőket.

(function () {
    // Mock data  - teszt adat
    let todos = [
        { title: 'Lunch', content: 'Lunch with my friends' },
        { title: 'Lunch', content: 'Lunch with my friends' },
        { title: 'Lunch', content: 'Lunch with my friends' },
    ];

    // Parts of date.
    const todoDay = document.querySelector('.form__day');
    const todoDate = document.querySelector('.form__date');

    const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednessday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    // Local storage handler object.  Lokal storage kezelő objektum
    const localDB = {
        // Majd így fogom meghívni  localDB.setItem('todos', todos); 
        setItem(key, value) {                // 1. Létrehuzzuk az Objectet - meg kell adni kulcsot, hogy mi lesz a neve az adatnak, és meg kell adni az értéket
            value = JSON.stringify(value);   // 2. JSON egy objektumból csinál stringet, mert a localstorge-nak csak stringet lehet megadni.
            localStorage.setItem(key, value); //3. Megadjuk, letároljuk a localstoragban az objektumot. Az 1, 2,  és 3 lépésekkel megoldottuk a create-t és az update-t
        },

        // Visszaolvasás a localstorageből az adatot. Ilyenkor nem kell az érték, csak, hogy mit akarok. Kell a kulcs. 
        getItem(key) {
            // Majd így fogom meghívni    localDB.getItem('todos');
            const value = localStorage.getItem(key);  // Átadom a key -t a getItemsnek
            if (!value) {
                return null;
            }
            return JSON.parse(value);   // és visszatérek a pars (értelmezés) sel ami ujra értelmezi és lesz belőle tömb meg objektum
        },
        // Törlés
        // Majd így fogom meghívni    localDB.removeItem('todos');
        removeItem(key) {   // Itt is csak meg kell neki adni a kulcsot.
            localStorage.removeItem(key);
        }
        // Eddigiekkel tudjuk kezelni ezzel az objektummal teljesen a localStorage-ot 
        // úgy, hogy JSON formátumban letesszük benne az adatot stringként.
        // és amikor vissza akarjuk olvasni, akkor azonnal vissza is alakítjuk, 
        // hogy megint tömb legyen és már úgy kapjuk vissza az adatokat.

    }


    // Initialize application. Az indítást lekezeli. 
    // Az init fogja ellenőrizni a dolgokat
    // Mit csinál az init?
    // Megnézi, hogy van e valami a localStorage ban, van e mentett teendő(todo), 
    // ha igen akkor betölti őket a storageból.
    // Ez az init függvény akkor fut le mikor indul a program. Lent a végén van meghívva.
    const init = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {                                  // ha van todo, akkor todos = savedTodos
            todos = savedTodos;
        }

        showDate();
    };

    // Show date.   Felül szerepelnie kell a dátumnak
    // A nap nevet a html-ben a form__day be, a dátumot a form__date ba iratjuk ki
    // Felülre elhelyezzük a Parts of date részbe a változókat.
    // const todoDay = document.querySelector('.form__day');
    // const todoDate = document.querySelector('.form__date');
    const showDate = () => {
        const currentDate = new Date();
        const day = [
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            currentDate.getFullYear(),
        ].map(num => num < 10 ? `0${num}` : num);

        // Mivel nincs olyan get... ami a napnak a nevét megadná,
        // ezért készítek felülre egy tömböt a napok nevével  const dayNames = [

        todoDay.textContent = dayNames[currentDate.getDay()];
        todoDate.textContent = day.join('-');
    };

    init();     // Itt a legvégén hívjuk meg az initet. Akkor fut le, mikor indul a program

})();

// most már tudunk tárolni teendőket a localStoregeban. 
// Nem tárolunk még mert nincs mit, de amúgy a fenti functionnal tudunk tárolni.


// 2. Feladat: Az alkalmazás indításkor ellenőrzi vannak-e mentett teendők, ha igen, akkor betölti őket storage-ból.
// A gond az, hogy ha nincs semmi a localeStorageban, akkor a kiolvasásnál a getItems null t advissza
 // Első lépésként meg kell vizsgálni azt, hogy a fenti functionban a getItemsnél a value az null,
 // akkor ne parsolgassunk, mert nincs érteme mert akkor nem string van, nincs semmi, null van
// Fentr beírjuk a getItems be az alábbit
//  if (!value) {
 //   return null;
//}
// És csak akkor fog a kódunk továbbmenni a követkző sorra 
// return JSON.parse(value); ami JSON parse t ad vissza, ha van value.

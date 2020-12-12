
// 1.  Fdeladat: Az alkalmazás localStorage-ben tárolja a teendőket.

(function () {
    // Mock data  - teszt adat  - a feladat folytatásához ki kell üríteni ezért kikommentelem
    //let todos = [
    //    { title: 'Lunch', content: 'Lunch with my friends' },
    //    { title: 'Lunch', content: 'Lunch with my friends' },
    //    { title: 'Lunch', content: 'Lunch with my friends' },
    //];

    let todos = [];       // Ez már a kiürített tömb

    // Parts of date.
    const todoDay = document.querySelector('.form__day');
    const todoDate = document.querySelector('.form__date');
    const todoAddBtn = document.querySelector('.todo__btn');
    const todoInput = document.querySelector('.todo__input');
    const todoListPending = document.querySelector('.todo__list--pending');

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
        setItem(key, value) {  // 1. Létrehuzzuk az Objectet - meg kell adni kulcsot, hogy mi lesz a neve az adatnak, és meg kell adni az értéket
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

    // Próbáljuk ki
    //1.   Próbaképpen ezt fogjuk eltárolni azaz lementeni a localStorage-ba-
    // let todos = [
    //    { title: 'Lunch', content: 'Lunch with my friends' },
    //    { title: 'Lunch', content: 'Lunch with my friends' },
    //    { title: 'Lunch', content: 'Lunch with my friends' }
    //];   // Miután kipróbáltuk, innen fel kell emelni a function elejére mint teszt adat. Mock data.Etért itt kikommentelem.

    // 1. Tároljunk le valamit (todos) a localStorage-ban Megadjuk, hogy milyen néven akarjuk azt az adatot elmenteni (pl todos)
    // localDB.setItem('todos', todos);   


    // 2. Adat visszaolvasása. Tegyük ki a konzolra
    // A getItem be fogja olvasni az adatot a localstorage-ból JSON formátumban
    // és visszaadja a parsolva, újra tömbként.
    // console.log(localDB.getItem('todos'));


    // 3. Törlés  
    // A removeItem nek megadom, hogy a todokat, todos akarom törölni
    // localDB.removeItem('todos');


    // Initialize application. Az indítást lekezeli. 
    // Az init fogja ellenőrizni a dolgokat
    // Mit csinál az init?
    // Megnézi, hogy van e valami a localStorage ban, van e mentett teendő(todo), 
    // ha igen akkor betölti őket a storageból.
    // Ez az init függvény akkor fut le mikor indul a program. Lent a végén van meghívva.
    const init = () => {
        const savedTodos = localDB.getItem('todos');
        //if (savedTodos) {           // Ezt áttesszük a loadExistingTodos ba      // ha van todo, akkor todos = savedTodos
        //   todos = savedTodos;
        //}

        showDate();
        setListeners();
        loadExistingTodos();
    };

    // Load existing todos. 
    const loadExistingTodos = () => {
        const savedTodos = localDB.getItem('todos');
        if (savedTodos) {                              // ha van todo, akkor todos = savedTodos       
            todos = savedTodos;
        }

        if (todos && Array.isArray(todos)) {
            // Ha létezik a todos és tömb akkor lép csak be a következő sorba
            todos.forEach(todo => showTodo(todo));  // Ha indul az alkalmazás, a meglévő todo k már láthatóak
        }
    };

    // Show date.   Felül szerepelnie kell a dátumnak
    // A nap nevet a html-ben a form__day be, a dátumot a form__date ba iratjuk ki
    // Felülre elhelyezzük a Parts of date részbe a változókat.
    // const todoDay = document.querySelector('.form__day');
    // const todoDate = document.querySelector('.form__date');
    const showDate = () => {      // Ezt a showDate t meghívjuk az init ben
        const currentDate = new Date();
        const day = [
            currentDate.getMonth() + 1,
            currentDate.getDate(),
            currentDate.getFullYear(),
        ].map(num => num < 10 ? `0${num}` : num); // Mit csinál a Map?
        // Kap egy tömböt, végigmegy a tömb egyes elemein, ezek számok lesznek. évszám, hónap száma, nap száma.
        // És utána megnézi a számot, az egyes számokat megkapja egyesével, 
        // és amit visszaad ez a függvény(ez most az arrow function)arra kicseréli a tömb elemét. 
        // Ha nagyobb mint 10 vagy egyenlő, akkor nem cseréli ki, akkor ugyanazt fogja visszaadni amit kapott,
        // de ha kissebb nint 10, akkor úgy adja vissza, hogy nulla + a szám.
        // Utána day t össze join olom kötőjelekkel. day.join('-');

        // Mivel nincs olyan get... ami a napnak a nevét megadná,
        // ezért készítek felülre egy tömböt a napok nevével  const dayNames = [

        todoDay.textContent = dayNames[currentDate.getDay()];
        todoDate.textContent = day.join('-');
    };


    // Set enent listeners  - Az eseménykezelőket ebben a függvényben gyűjtjük össze
    // Az összes eseményt Ebben a függvényben állítjuk be egy helyen
    // Hogy lefusson ez a függvény, a const initben kell meghívni 
    const setListeners = () => {
        todoAddBtn.addEventListener('click', addNewTodo);
    };


    // Save and add todo to the database.
    const addNewTodo = () => {
        const value = todoInput.value;
        if (value === '') {                   //Ha nincs semmit az inputban és rákattintanak a + gombra     
            alert('Please type a todo.');     //akkor felugró alak, alert('Please type a todo.');  
            return;                           // Ez azt előzi meg, hogy ne tudjak úgy hozzáadni todo t, hogy nem írtam be semmit.
        }

        // Következő lépés, hogy az inputnak a szövekét bele kell tenni egy objektumba
        const todo = {      // Két dolog van egy todo ban. Van egy szöveg és meg van jelölve, hogy kész van vagy nincs kész
            text: value,     // Az input ba beírt value
            done: false,     // Amikor létrehozzuk a textet akkor még nem kész, tehát  done false kell beállitani
        };

        todos.push(todo);  // A feljebb létrehozott új todot bele pusholom a tömbbe, ahol a todo kAt tároljuk.  let todos = [];

        // Következő lépés, hogy elmentsük az adatot a localStorageba
        // A setItem függvényt meghíjuk
        localDB.setItem('todos', todos);

        // Összefoglaló eddig: 
        //Megnéztük, hogy van e érték beírva az inputba, 
        // Kiolvastuk az inputból az értéket
        // Ha nincs benne semmi a kkor alerttel kiiratjuk, hogy írjál bele valamit
        // Ha be van valami írva akkor nem megy be az if be és megy tovább 
        // Megadtuk, hogy a todo szövege legyen az érték amit kiolvasunk az inputból.
        // Utána betettük a todo tömbbe a most frissen létrehozott todo t
        // Utána a localDB t frissitettem a setItemmel, hogy már az új todo k kerüljenek bele amiben már benne van az új elem is.
        // tehát felülírtam az adatbázisban. Vagyis egy update t csináltam

        showTodo(todo);  // Itt hívjuk meg a showTodo függvényt, és adjuk neki a todo t

        todoInput.value = '';  // Ha hozzáadtuk az új todot a tümbhöz, utána ürítsük ki az input mezőt
        // Ezzel az addNewTodo készen van
    };

    // Következő feladat, hogy megjelenik az új teendőt, todo t a listában a html ben
    // Show todo in the list.  Megjeleníti a todo kat a todo__list--pending ben
    // Ez a függvény azt fogja csinálni, hogy a todo kontéderen belül létrehoz egy új divet
    // amibe kiteszi a todo nak az adatait.
    // 1. lépésként meg kell keresni a todo__list--pending elemet ezért fent létrehozunk egy új változót  const todoListPending
    const showTodo = todo => {
        const todoItem = document.createElement('div');  // Létrehoztunk egy új divet ami még csak a js ben látható mert nem adtuk hoozzá egyetlen html elemhez sem
        todoListPending.appendChild(todoItem);   // A létrehozott elemet hozzáadtjuk a listához.

        // A todoItem 3 dolgot kell megjeleníteni. 
        // 1 checkbox ot ami arra jó, hogy készre tudjuk jelölni a todo t,
        // 2. A szöveges rész megjelenítése egy span elemben, a tartalma lesz a todo.text vagyis a tudunak a textjében lévő value érték
        // 3 Egy gomb ami a törlést fogja szolgálni
        todoItem.innerHTML = `
          <input type="checkbox">     
          <span>${todo.text}</span>
          <button>
            <i class="fa fa-trash"></i>
          </button>        
        `;
        // Összefoglaló:
        // A document.createElement a js en belül létrehoz egy változót, ami egy htmlelement tipusu változó lesz,
        // és azon belül is egy div. Ez még csak a js ben létezik. 
        // Ez az elem ugynúgy viselkedik, mintha kiválasztottam volna document.querySelector ral kiválasztottam volna egy elemet a html ben.
        // Tehát mindent meg tudunk vele csinálni mint egy kiválasztott elemmel, a külömbség az, hogy ez az elem automatikusan nem látszik .
        // mert csak a js memóriában van.
        // Be lehet neki állitani pl textContentet, hozzáadok osztályokat classList et, be tudok állítani css t, stb
        // Meg kell neki mondani, hogy a html oldalon hol jelenjen meg.
        // De csak akkor válil láthatóvá mikor azt mondom, hogy egy bizonyos elemhez hozzáadom
        // a mi estünkben a teendőket befogadó divhez.
        // todoListPending.appendChild(todoItem);

    };

    init();  // Itt a legvégén hívjuk meg az initet. Akkor fut le, mikor indul a program

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

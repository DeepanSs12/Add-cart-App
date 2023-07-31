import { initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
       databaseURL: "https://realtime-database-1fdd2-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const moviesInDB = ref(database, "foods");


// this line of is to import the html id and class 
const inputFieldEl = document.getElementById("inner");
const addButtonEl = document.getElementById("btn");
const listItem = document.getElementById("list");

//this code is once the user click the add cart button after item included the list would n0t create with blank list
addButtonEl.addEventListener('click', function() {
    let value = inputFieldEl.value.trim();
    if (value !== '') {
        push(moviesInDB, value);
        emptyValue();
    }
});
 
// the onValue function is to store data to database in ref (moviesindb) and snopshot method was fetch rthe
// data from  realtime database and showcase on rhe application
onValue(moviesInDB, function(snapshot) {
    if (snapshot.exists()) {
        let array = Object.entries(snapshot.val());
        clearListItems();
        for (let i = 0; i < array.length; i++) {
            let currentItems = array[i];
            appendItems(currentItems);
        }
    } else {
        listItem.innerHTML = 'Add something you want';
    }
});

//the purpose of this function in to once the item was included means after the user click the add cart button the item will be included in 
//list and it as been hidden from input
function clearListItems() {
    listItem.innerHTML = '';
} 

function emptyValue() {
    inputFieldEl.value = '';
}

function appendItems(item) {
    let itemID = item[0];
    let itemValue = item[1];
    let newList = document.createElement('li');
    newList.textContent = itemValue;
    newList.addEventListener('click', function() {
        let exactLocOfItem = ref(database, `foods/${itemID}`);
        remove(exactLocOfItem);
    });
    listItem.append(newList);
}

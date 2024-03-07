import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  databaseURL:
    "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257",
};

initializeApp(firebaseConfig);
const db = getDatabase();
function displayCatalogData() {
    const dbref = ref(db, "book-type/");
    onValue(dbref, (snapshot) => {
      const data = snapshot.val();
      const categories = Object.values(data).map(dataValue => `<h2 class="box"><a href="../pages/catalog.html">${dataValue.bookCategorie}</a></h2>`).join('');
  
      const catalogSection = document.getElementById('catalogSect');
      const secondContainer = catalogSection.querySelector('.secondContainer');
      secondContainer.innerHTML = categories;
    });
  }
  
  
window.onload = function () {
  displayCatalogData();
};

let catalogSect = document.querySelector("#catalogSect");

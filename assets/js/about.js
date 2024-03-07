// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

import {
  getDatabase,
  ref,
  push,
  onValue,
  get,
  child,
  set,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  databaseURL: "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257"
};

const app = initializeApp(firebaseConfig);
// console.log(app);

const db = getDatabase();
// console.log(db);

let aboutTitle = document.querySelector("#aboutTitle");
let aboutDesc = document.querySelector("#aboutDesc");
let aboutImage = document.querySelector("#aboutImage");
let aboutImageContainer = document.querySelector("#aboutImageContainer");

function getData() {
  const dbref = ref(db);

  get(child(dbref, "about-info/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        let dataArr = Object.entries(snapshot.val());
        // console.log(dataArr);
        dataArr.forEach((item) => {
          let elementId = item[0]; // 1ci elementi id olarag
          console.log(elementId);
          let htmlContent = item[1]; // 2ci innerhtml ile gostermek istediyimiz element
          //   console.log(htmlContent);

          switch (elementId) {
            case "aboutBookImg":
                aboutImageContainer.innerHTML = `<img id="aboutImage" class="img_1" src="${htmlContent}" alt="About Image"  >`;
              break;
            case "aboutDesc":
              aboutDesc.innerHTML = htmlContent;
              break;
            case "aboutTitle":
              aboutTitle.innerHTML = htmlContent;
              break;
            default:
              console.log(`Element with ID ${elementId} not recognized.`);
              break;
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// getData funskiyasini sehife acildiqda cagiririq
window.onload = function () {
  getData();
};

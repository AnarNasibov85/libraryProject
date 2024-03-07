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
const tableBody = document.querySelector("#table_body");
initializeApp(firebaseConfig);
const db = getDatabase();
// console.log(db);
const dbref = ref(db, "contact-us/");
const trow = 1;
onValue(dbref, (snapshot) => {
  const data = convertArrayData(snapshot.val());
  console.log(data);
  tableBody.innerHTML = data
    ?.map(
      (item, index) =>
        `
          <tr id="cont_tr" class="b_tr">
          <td class="th_num">${trow + index}</td>
          <td id="contactName0" class="th_book_title"> <p>${
            item.fullname
          }</p></td>
          <td id="contactAdress0" class="th_book_description">${
            item.address
          }</td>
          <td id="contactEmail0" class="th_book_Category">${item.email}</td>
          <td id="contactNum0" class="th_book_author"> ${item.phone}</td>
      </tr>
          `
    )
    .join("");
  trow += data.length;
});
function convertArrayData(obj) {
  const array = Object.entries(obj);
  const newArray = array.map((item) => ({
    id: item[0],
    ...item[1],
  }));
  return newArray;
}

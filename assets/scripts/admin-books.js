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
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to display notifications with timer bar
function displayNotification(message, type) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = message;

  const timerBar = document.createElement("div");
  timerBar.className = "timer-bar";
  notification.appendChild(timerBar);

  notificationContainer.appendChild(notification);
  document.body.appendChild(notificationContainer);

  let countdown = 5;
  const timerInterval = setInterval(() => {
    countdown--;

    if (countdown <= 0) {
      clearInterval(timerInterval);
      notificationContainer.remove();
    } else {
      timerBar.style.width = (countdown / 5) * 100 + "%";
    }
  }, 1000);
}

// Function to display success notification
function displaySuccessNotification(message) {
  displayNotification(message, "success");
}

// Function to display error notification
function displayErrorNotification(message) {
  displayNotification(message, "error");
}

// admin-books html elements
const all_books_table = document.querySelector("#all_books_table");
const Correct_panel = document.querySelector("#Correct_panel");
const correct_title = document.querySelector("#correct_title");
const correct_author = document.querySelector("#correct_author");
const correct_img_url = document.querySelector("#correct_img_url");
const correct_publication_year = document.querySelector(
  "#correct_publication_year"
);
const correct_checkbox = document.querySelector("#correct_checkbox");
const coorecy_type_input = document.querySelector("#coorecy_type_input");
const correct_description = document.querySelector("#correct_description");
const correct_btn = document.querySelector("#correct_btn");
// admin-books html elements

function displayAllBooks() {
  const dbref = ref(db, "books/");

  onValue(dbref, (snapshot) => {
    const data = snapshot.val();
    let All_books_obj = Object.values(data);
    let all_keys = Object.keys(data);

    let html_arr = All_books_obj.map((item, i) => {
      let unic_id_delete = `delete${i}`;
      let unic_id_correct = `correct${i}`;
      return `
        <tr class="b_tr">
          <th class="th_num">${i + 1}</th>
          <th class="th_book_title_b"><img src="${item.imageUrl}" alt=""> <p>${
        item.title
      }</p></th>
          <th class="th_book_description"><p>${item.description}</p></th>
          <th class="th_book_Category">${item.bookType}</th>
          <th class="th_book_author">${item.author}</th> 
          <th class="th_book_icons">
            <div><img src="../img/icons8-pencil-64.png" id="${unic_id_correct}" class="delete_svg"> </div>
            <div><img src="../img/delete.svg" id="${unic_id_delete}" class="delete_svg"  alt=""></div>
          </th>
        </tr>  
      `;
    });

    let html = html_arr.join("");
    all_books_table.innerHTML = html;
    for (let i = 0; i < All_books_obj.length; i++) {
      delete_from_fireBase(`delete${i}`, i);
      correct_el_in_fireBase(`correct${i}`, i);

    }

    function delete_from_fireBase(id, i) {
      let el = document.querySelector(`#${id}`);
      el.addEventListener("click", () => {
        let el = document.querySelector(`#${id}`);
        let key = all_keys[i];
        console.log(key);
        el.addEventListener("click", (i) => {
          let condition = confirm(`Are you sure you want to delete?`);
          if (condition) {
            let path = `books/${key}`;
            deleteData(path);
          }
          return;
        });
      });
    }

    function correct_el_in_fireBase(id, i) {
      let el = document.querySelector(`#${id}`);
      el.addEventListener("click", () => {
        Correct_panel.classList.remove("d-none");
        
        let obj = All_books_obj[i];

        // Filling form
        correct_title.value = obj.title;
        correct_author.value = obj.author;
        correct_img_url.value = obj.imageUrl;
        correct_publication_year.value = obj.publicationYear;
        coorecy_type_input.value = obj.bookType || "Unknown type";
        correct_description.value = obj.description;
        correct_checkbox.checked = obj.isNew ? true : false;
        // Filling form

        // Set information to Firebase
        let key = all_keys[i];
        let el = All_books_obj[i];
        correct_btn.addEventListener("click", () => {
          let isNew;
          correct_checkbox.checked == true ? (isNew = true) : (isNew = false);

          let path = `books/${key}`;

          let newData = {
            Date: obj.Date,
            author: correct_author.value,
            bookType: coorecy_type_input.value,
            description: correct_description.value,
            imageUrl: correct_img_url.value,
            isNew: isNew,
            publicationYear: correct_publication_year.value,
            title: correct_title.value,
          };
          let condition1 = correct_author.value == el.author;
          let condition2 = coorecy_type_input.value == el.bookType;
          let condition3 = correct_description.value == el.description;
          let condition4 = el.imageUrl == correct_img_url.value;
          let condition5 = el.isNew == isNew;
          let condition6 = el.publicationYear == correct_publication_year.value;
          let condition7 = correct_title.value == el.title;
          console.log(
            condition1,
            condition2,
            condition3,
            condition4,
            condition5,
            condition6,
            condition7
          );
          if (
            condition1 &&
            condition2 &&
            condition3 &&
            condition4 &&
            condition5 &&
            condition6 &&
            condition7
          ) {
            alert(`Nothing changed`);
          } else {
            Correct_panel.classList.add("d-none");
            updateData(path, newData);
          }
        });
      });
    }

  });
}

displayAllBooks();

export async function updateData(path, updates) {
  try {
    await update(ref(db, path), updates);
    console.log("Data updated successfully");
    displaySuccessNotification("Data updated successfully");
  } catch (error) {
    console.error("Error updating data:", error.message);
    displayErrorNotification("Error updating data");
  }
}

export async function deleteData(path) {
  try {
    await remove(ref(db, path));
    console.log("Data deleted successfully");
    displaySuccessNotification("Data deleted successfully");
  } catch (error) {
    console.error("Error deleting data:", error.message);
    displayErrorNotification("Error deleting data");
  }
}
window.addEventListener("click", (event) => {
  if (event.target === Correct_panel) {
    Correct_panel.classList.add("d-none");
  }
});
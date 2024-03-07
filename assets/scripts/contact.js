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
// console.log(db);

function displayNotification(message, type) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";

  const notification = document.createElement("div");
  notification.className = "notification";
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
      notification.remove();
      notificationContainer.remove();
    } else {
      timerBar.style.width = (countdown / 5) * 100 + "%";
    }
  }, 1000);
}

function displaySuccessNotification(message, type) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";

  const notification = document.createElement("div");
  notification.className = "notification success-notification"; // Added success-notification class
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
      notification.remove();
      notificationContainer.remove();
    } else {
      timerBar.style.width = (countdown / 5) * 100 + "%";
    }
  }, 1000);
}

document.getElementById("sendBtn").addEventListener("click", function (event) {
  event.preventDefault();

  var fullname = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var address = document.getElementById("address").value;
  var phone = document.getElementById("phone").value;
  var note = document.getElementById("note").value;

  if (!fullname || !email || !address || !phone || !note) {
    displayNotification("Please fill in all fields!", "danger");
    console.log("err");
  } else {
    var formData = {
      fullname: fullname,
      email: email,
      address: address,
      phone: phone,
      note: note,
    };
    console.log(formData);

    const dbref = ref(db, "contact-us/");
    push(dbref, formData)
      .then(() => {
        displaySuccessNotification("Data sent successfully!", "success"); // Changed to displaySuccessNotification
      })
      .catch((err) => {
        displayNotification("Error sending data!", "danger");
        console.error("Error sending data:", err);
      });
  }
});

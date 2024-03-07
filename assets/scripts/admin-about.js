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
const db = getDatabase();

const aboutInfoBtn = document.querySelector("#about-info-add");

aboutInfoBtn.addEventListener("click", function (event) {
  event.preventDefault();
  const aboutTitle = document.querySelector("#aboutTitle").value;
  const aboutBookImg = document.querySelector("#aboutBookImg").value;
  const aboutDesc = document.querySelector("#aboutDesc").value;

  // check if any field is empty
  if (!aboutTitle || !aboutBookImg || !aboutDesc) {
    displayNotification("Please fill in all fields!", "error");
    return; // Stop further execution
  }

  // Convert input values to an object
  let aboutBookData = {
    aboutTitle,
    aboutBookImg,
    aboutDesc,
  };

  // Set the data in the database
  set(ref(db, "about-info/"), aboutBookData)
    .then(() => {
      displaySuccessNotification("Data set successfully!");
      console.log("Data set successfully!");
    })
    .catch((error) => {
      displayNotification("Error setting data: " + error.message, "error");
      console.error("Error setting data: ", error);
    });
});

function displayNotification(message, type, callback) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";

  const notification = document.createElement("div");
  notification.className =
    "notification" + (type === "error" ? " error-notification" : ""); // Added error-notification class if type is 'error'
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
      if (typeof callback === "function") {
        callback(); // Invoke callback function upon notification dismissal
      }
    } else {
      timerBar.style.width = (countdown / 5) * 100 + "%";
    }
  }, 1000);
}

function displaySuccessNotification(message, callback) {
  displayNotification(message, "success", callback);
}

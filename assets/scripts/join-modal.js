import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c",
  authDomain: "library-35b3c.firebaseapp.com",
  projectId: "library-35b3c",
  storageBucket: "library-35b3c.appspot.com",
  messagingSenderId: "498632706422",
  appId: "1:498632706422:web:9d181dd4820520b7c01257",
  databaseURL:
    "https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

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

const Join_btn = document.querySelector("#Join_btn");

Join_btn.addEventListener("click", async () => {
  const Join_name = document.querySelector("#Join_name").value;
  const Join_email = document.querySelector("#Join_email").value;

  if (!Join_name || !Join_email) {
    displayNotification("Please fill in all fields!", "danger");
    return;
  }

  const join_info = {
    Join_name,
    Join_email,
  };

  console.log(join_info);

  try {
    const joinRef = ref(database, "join-info");
    await push(joinRef, join_info);
    displaySuccessNotification("Joined successfully!", "success"); // Call displaySuccessNotification for success
  } catch (error) {
    console.error("Error adding join info to Firebase:", error);
    displayNotification("Error joining!", "danger");
  }

  document.querySelector("#Join_email").value = "";
  document.querySelector("#Join_name").value = "";
});

const joinModal = document.querySelector("#joinModal");

document.addEventListener("DOMContentLoaded", () => {
  const joinBtn = document.querySelector("#joinBtn");

  joinBtn.addEventListener("click", () => {
    joinModal.style.display =
      joinModal.style.display === "none" || joinModal.style.display === ""
        ? "block"
        : "none";
  });
});

window.addEventListener("click", (event) => {
  if (event.target === joinModal) {
    joinModal.style.display = "none";
  }
});

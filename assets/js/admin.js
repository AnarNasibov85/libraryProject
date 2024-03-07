import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
const auth = getAuth(app);

export const firebaseDatabase = database;

const searchInput = document.querySelector("#search_Input");
const searchBtn = document.querySelector("#search_Btn");
const searchVariant = document.querySelector("#search_variant");
const bookAddBtn = document.querySelector("#book_add");
const bookFormDiv = document.querySelector("#book_form_div");
const formSectionTitle = document.querySelector("#form_section_title_input");
const formSectionAuthor = document.querySelector("#form_section_author_input");
const formSectionImg = document.querySelector("#form_section_img_url");
const formSectionYear = document.querySelector(
  "#form_section_publication_year"
);
const formSectionType = document.querySelector("#bookCategorie");
const formSectionDescription = document.querySelector(
  "#form_section_description_input"
);

async function getBooks(searchTerm) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );
    if (!response.ok) {
      throw new Error("API request failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}

async function showBookVariants(books) {
  let bookdata = books.map((book) => {
    return `
      <div class="variant-details" id="variant">
        <h3>${book.volumeInfo.title}</h3>
      </div>
    `;
  });
  searchVariant.innerHTML = bookdata.join(" ");

  const variants = document.querySelectorAll(".variant-details");
  variants.forEach((variant) => {
    variant.addEventListener("click", () =>
      fillFormInputs(variant.textContent.trim(), books)
    );
  });
}

function fillFormInputs(selectedTitle, books) {
  const selectedBook = books.find(
    (book) => book.volumeInfo.title === selectedTitle
  );

  if (!selectedBook) {
    console.error("Selected book not found.");
    displayNotification("Selected book not found.", "error");
    return;
  }

  const titleInput = selectedBook.volumeInfo.title || "Unknown Title";
  const authorInput = selectedBook.volumeInfo.authors?.[0] || "Unknown Author";
  const imageUrlInput =
    selectedBook.volumeInfo.imageLinks?.thumbnail || "/assets/img/default.png";
  const publicationYearInput =
    selectedBook.volumeInfo.publishedDate || "Unknown";
  const descriptionInput =
    selectedBook.volumeInfo.description || "No Description Available";
  const bookTypeInput =
    selectedBook.volumeInfo.categories &&
    selectedBook.volumeInfo.categories.length > 0
      ? selectedBook.volumeInfo.categories.join(", ")
      : "Unknown Type";

  formSectionTitle.value = titleInput;
  formSectionAuthor.value = authorInput;
  formSectionImg.value = imageUrlInput;
  formSectionYear.value = publicationYearInput;
  formSectionDescription.value = descriptionInput;
  formSectionType.value = bookTypeInput;
}

async function addBookToFirebase(bookData) {
  bookData.Date = getCurrentDate();
  try {
    const booksRef = ref(database, "books");
    await push(booksRef, bookData);
    displaySuccessNotification("Kitab uğurla Firebase-ə əlavə edildi.");
  } catch (error) {
    console.error("Error adding book to Firebase:", error);
    displayNotification("Error adding book to Firebase", "error");
    throw error;
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}
const currentDate = getCurrentDate;

function clearFormInputs() {
  formSectionTitle.value = "";
  formSectionAuthor.value = "";
  formSectionImg.value = "";
  formSectionYear.value = "";
  formSectionDescription.value = "";
  formSectionType.value = "";
  searchInput.value = "";
}

function validateFormInputs(formInputs) {
  return (
    formInputs.title &&
    formInputs.author &&
    formInputs.imageUrl &&
    formInputs.description &&
    formInputs.bookType &&
    formInputs.publicationYear
  );
}

bookFormDiv.addEventListener("click", (event) => {
  if (!event.target.matches("#book_add")) return;

  const formInputs = getFormInputs();

  if (!validateFormInputs(formInputs)) {
    displayNotification("Please fill in all fields!", "error");
    return;
  }

  const bookData = {
    title: formInputs.title,
    author: formInputs.author,
    imageUrl: formInputs.imageUrl,
    description: formInputs.description,
    bookType: formInputs.bookType,
    publicationYear: formInputs.publicationYear,
    isNew: formInputs.isNew,
  };

  addBookToFirebase(bookData);

  clearFormInputs();
  searchVariant.style.display = "none";
});

function getFormInputs() {
  const title = formSectionTitle.value.trim();
  const author = formSectionAuthor.value.trim();
  const imageUrl = formSectionImg.value.trim();
  const publicationYear = formSectionYear.value.trim();
  const description = formSectionDescription.value.trim();
  let isNew = isCheckboxSelected();

  const bookTypeValue =
    typeof formSectionType.value === "string"
      ? formSectionType.value.trim()
      : formSectionType.value;

  return {
    title,
    author,
    imageUrl,
    publicationYear,
    description,
    bookType: bookTypeValue,
    isNew: isNew,
  };
}

searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length == 0) {
    searchVariant.style.display = "block";
  }
  if (searchTerm.length > 0) {
    const data = await getBooks(searchTerm);
    if (data && data.items) {
      showBookVariants(data.items);
    }
    displayFunk(searchVariant);
  }
});

function displayFunk(el) {
  let class_List = el.classList;
  if (class_List.contains("d-none")) {
    el.classList.remove("d-none");
  }
}

const admin_panel_btn = document.querySelector("#admin_panel_btn");
let userName_inp = document.querySelector("#admin_panel_username");
let Password_inp = document.querySelector("#admin_panel_pasword");
let admin_auth = document.querySelector("#admin_auth");
let admin_main = document.querySelector("#admin_main");
let log_outh = document.querySelector("#log_outh");

admin_panel_btn.addEventListener("click", () => {
  let userName = userName_inp.value;
  let Password = Password_inp.value;

  if (!userName || !Password) {
    displayNotification("Please fill in all fields!", "error");
  }
  signIn(userName, Password);
});

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Sign-in successful");
    admin_auth.classList.add("d-none");
    admin_main.classList.remove("d-none");
    return userCredential.user;
  } catch (error) {
    displayNotification("You wrote something wrong.", "error");
    console.error("Error signing in:", error.message);
    return null;
  }
}

log_outh.addEventListener("click", () => {
  admin_auth.classList.remove("d-none");
  admin_main.classList.add("d-none");
});

let addTypeModal = document.querySelector("#addTypeModal");
let addTypeBtnForm = document.querySelector("#addTypeBtnForm");
let closeTypeBtn = document.querySelector("#closeTypeBtn");

function toggleModal() {
  addTypeModal.style.visibility =
    addTypeModal.style.display === "visible" ? "hidden" : "visible";
}

addTypeBtnForm.addEventListener("click", toggleModal);
closeTypeBtn.addEventListener("click", function () {
  addTypeModal.style.visibility = "hidden";
});

let addBtnCategorie = document.querySelector("#addBtnCategorie");

addBtnCategorie.addEventListener("click", function (event) {
  event.preventDefault();

  let bookCategorie = document.querySelector("#bookCategorie").value;

  if (bookCategorie.trim() !== "") {
    const databaseRef = ref(database, "book-type/");
    push(databaseRef, {
      bookCategorie: bookCategorie,
    })
      .then(() => {
        displaySuccessNotification("Data sent successfully.");
        document.querySelector("#bookCategorie").value = "";
      })
      .catch((err) => {
        displayNotification("Error occurred: " + err.message, "error");
      });
  } else {
    displayNotification("Please enter a valid book category.", "error");
  }
});

function isCheckboxSelected() {
  let checkbox = document.querySelector("#new_book_checkbox");

  if (checkbox.checked) {
    return true;
  } else {
    return false;
  }
}

function displayCategorieInMenu() {
  const dbref = ref(database, "book-type/");
  onValue(dbref, (snapshot) => {
    const data = snapshot.val();

    const options = Object.values(data)
      .map(
        (dataValue) =>
          `<option value="${dataValue.bookCategorie}">${dataValue.bookCategorie}</option>`
      )
      .join("");

    const menuTypeSect = document.getElementById("form_section_type_input");
    menuTypeSect.innerHTML = options;
  });
}

window.onload = function () {
  displayCategorieInMenu();
};

function displayNotification(message, type, callback) {
  const notificationContainer = document.createElement("div");
  notificationContainer.className = "notification-container";

  const notification = document.createElement("div");
  notification.className =
    "notification" + (type === "success" ? " success-notification" : ""); // Added success-notification class if type is 'success'
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

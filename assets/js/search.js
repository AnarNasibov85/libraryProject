

// Firebase konfiqurasiyası və tətbiqin başlatılması

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
} from 'https://www.gstatic.com/firebasejs/9.6.5/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c',
  authDomain: 'library-35b3c.firebaseapp.com',
  projectId: 'library-35b3c',
  storageBucket: 'library-35b3c.appspot.com',
  messagingSenderId: '498632706422',
  appId: '1:498632706422:web:9d181dd4820520b7c01257',
  databaseURL:
    'https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app',
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// HTML-dən lazım olan elementlərin alınması
const searchBtnEl = document.querySelector('#searchBtnEl');
const inputSearchEl = document.querySelector('#inputSearchEl');
const swiper_div = document.querySelector('#swiper_div');
const book_img = document.querySelector('#book_img');
const book_name_h2 = document.querySelector('#book_name_h2');
const author_p = document.querySelector('#author_p');
const title_p = document.querySelector('#title_p');
// Axtarış düyməsinə klikləndikdə kitabları axtaran funksiya
function searchBooks(query) {
  // Firebase-dən kitabları almaq
  const booksRef = ref(database, 'books');

  get(booksRef).then((snapshot) => {
    const data = snapshot.val();
    const books = Object.values(data);

    const filteredBooks = books.filter((book) => {
      const title = book.title.toLowerCase();
      const author =
        typeof book.author === 'string' ? book.author.toLowerCase() : '';
      return (
        title.includes(query.toLowerCase()) ||
        author.includes(query.toLowerCase())
      );
    });

  

    renderBooks(filteredBooks);
  });
}

function renderBooks(books) {
  let swiperDiv = books.map((book) => {
    return `
 <div class="swiper-slide" >  
  <div class="box2" >
      <div class="book1" >
        <img
          class="book" id="book_img"
          src="${book.imageUrl}"
          alt="book"
        />
      </div>
      <div class="book_title" id="book_title_div">
        <h2 class="book_name" id="book_name_h2">${book.title}</h2>
        <p class="author" id="author_p">${book.author}</p>
        <p class="title" id="title_p">${book.description}
        </p>
      </div>
     
    </div>
    </div>
  
    `;
  });
  swiper_div.innerHTML = swiperDiv.join('');
}
// Axtarış düyməsinə klikləndikdə axtarış prosesini başlatma
searchBtnEl.addEventListener('click', () => {
  const searchTerm = inputSearchEl.value.trim();
 
  searchBooks(searchTerm);
});

// Firebase-dəki məlumatı səhifə yüklənərkən göstərmək üçün renderBooks funksiyasını buraya əlavə edirik
onValue(ref(database, 'books'), (snapshot) => {
  const data = snapshot.val();
  const books = Object.values(data);

  renderBooks(books);
});

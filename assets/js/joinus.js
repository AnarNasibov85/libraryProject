
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import {
  getDatabase,
  ref,
  onValue,
} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCmrBszyLIOb3kPxG_ou9O99qTBV9s7M3c',
  authDomain: 'library-35b3c.firebaseapp.com',
  databaseURL: 'https://library-35b3c-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'library-35b3c',
  storageBucket: 'library-35b3c.appspot.com',
  messagingSenderId: '498632706422',
  appId: '1:498632706422:web:9d181dd4820520b7c01257',
};
// Firebase tətbiqini başlatmaq
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// HTML-dəki cədvəl elementini seçmək
const table_body_us = document.querySelector('#table_body_us');
// Firebase-dən məlumatları alıb cədvələ əlavə etmə funksiyası
function displayJoinUsData() {
  const dbRef = ref(database, 'join-info/');
  onValue(dbRef, (snapshot) => {
    table_body_us.innerHTML = ''; // Cədvəli təmizlə
    let index = 1;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const row = `
        <tr class="table_body_join">
          <th class="th_num">${index}</th>
          <td class="th_text">${data.Join_name}</td>
          <td class="th_text2">${data.Join_email}</td>
        </tr>
      `;
      table_body_us.innerHTML += row; // Yeni sətri cədvələ əlavə et
      index++;
    });
  });
}
// Səhifə yükləndiyində məlumatları cədvələ əlavə etmə funksiyasını çağırmaq
displayJoinUsData();


  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAluydBAKev_UyoXjSYBTtYsSJcEzFdtbk",
    authDomain: "library-4c363.firebaseapp.com",
    projectId: "library-4c363",
    storageBucket: "library-4c363.appspot.com",
    messagingSenderId: "969354239883",
    appId: "1:969354239883:web:36dbbb9402fb504dd3998e"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();

//   function writeSetData(collection,data ){
//     try{
//         if(!collection){
//             alert("required collection")
//             return
//         }
//         const refel=ref(db, collection )
//         set(refel,data)
//     }catch(err){
//         console.log(err);
//     }
   
//   }
//   let form={
//     book_id:1,
//     comment: "bax bax bax bax",
//     comment_date: 1212454

//   }
//   writeSetData("comments/",form)

  
//   set(commentsRef,"babab")
  console.log(db)
  const book_ref=ref(db,'comments/')
  set(book_ref,"aaaaaa")


// yuxardaki kod bele yazilsa daha yaxsi olar
  // set(ref(db, 'comments/'), "aaaaaa");

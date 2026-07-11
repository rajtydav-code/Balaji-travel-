import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQFMYQACZbYc3iNl7NX4l8GQDZD7iABGA",
  authDomain: "balaji-travel-c7fe2.firebaseapp.com",
  projectId: "balaji-travel-c7fe2",
  storageBucket: "balaji-travel-c7fe2.firebasestorage.app",
  messagingSenderId: "225318564836",
  appId: "1:225318564836:web:db79d175ee5ac6c8114df1",
  measurementId: "G-SLVL9MSGDS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const table = document.getElementById("bookingTable");

onSnapshot(collection(db, "bookings"), (snapshot) => {
  table.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    table.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td>${data.mobile}</td>
        <td>${data.pickup}</td>
        <td>${data.drop}</td>
        <td>${data.date}</td>
        <td>${data.vehicle}</td>
        <td>${data.status}</td>
      </tr>
    `;
  });
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQFMYQACZbYc3iNl7NX4l8GQDZD7iABGA",
  authDomain: "balaji-travel-c7fe2.firebaseapp.com",
  projectId: "balaji-travel-c7fe2",
  storageBucket: "balaji-travel-c7fe2.firebasestorage.app",
  messagingSenderId: "225318564836",
  appId: "1:225318564836:web:db79d175ee5ac6c8114df1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const table = document.getElementById("bookingTable");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const table = document.getElementById("bookingTable");

loginBtn.onclick = () => {
  signInWithPopup(auth, provider);
};

logoutBtn.onclick = () => {
  signOut(auth);
};

onAuthStateChanged(auth, (user) => {

  if (!user) {
    table.innerHTML = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    return;
  }

  if (user.email !== "balaji.travel.org@gmail.com") {
    alert("Access Denied");
    signOut(auth);
    return;
  }

  loginBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";

  onSnapshot(collection(db, "bookings"), (snapshot) => {

    table.innerHTML = "";

    snapshot.forEach((booking) => {

      const data = booking.data();

      table.innerHTML += `
      <tr>
        <td>${data.name}</td>
        <td>${data.mobile}</td>
        <td>${data.pickup}</td>
        <td>${data.drop}</td>
        <td>${data.date}</td>
        <td>${data.vehicle}</td>
        <td>${data.status}</td>
        <td>
          <button onclick="approveBooking('${booking.id}')">Approve</button>
          <button onclick="rejectBooking('${booking.id}')">Reject</button>
          <button onclick="deleteBooking('${booking.id}')">Delete</button>
        </td>
      </tr>
      `;

    });

  });

});

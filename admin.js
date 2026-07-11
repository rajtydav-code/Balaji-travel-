import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
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

provider.setCustomParameters({
    prompt: "select_account"
});
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const table = document.getElementById("bookingTable");

loginBtn.onclick = async () => {
  try {
    await signOut(auth);
  } catch (e) {}

  await signInWithPopup(auth, provider);
};

logoutBtn.onclick = async () => {
  await signOut(auth);
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

  const q = query(
    collection(db, "bookings"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {

    table.innerHTML = "";

    if (snapshot.empty) {
      table.innerHTML =
      `<tr>
        <td colspan="8">No bookings found</td>
      </tr>`;
      return;
    }

    snapshot.forEach((booking) => {

      const data = booking.data();
      let statusColor = "orange";

if (data.status === "Approved") {
    statusColor = "lime";
}

if (data.status === "Rejected") {
    statusColor = "red";
}

table.innerHTML += `
<tr>

<td>${data.name}</td>

<td>${data.mobile}</td>

<td>${data.pickup}</td>

<td>${data.drop}</td>

<td>${data.date}</td>

<td>${data.vehicle}</td>

<td style="color:${statusColor};font-weight:bold;">
${data.status || "Pending"}
</td>

<td>

<button onclick="approveBooking('${booking.id}')">
✅ Approve
</button>

<button onclick="rejectBooking('${booking.id}')">
❌ Reject
</button>

<button onclick="deleteBooking('${booking.id}')">
🗑 Delete
</button>

<br><br>

<a href="tel:${data.mobile}">
<button>📞 Call</button>
</a>

<a href="https://wa.me/91${data.mobile}" target="_blank">
<button>💬 WhatsApp</button>
</a>

</td>

</tr>
`;
  });

});

});

window.approveBooking = async (id) => {
  try {
    await updateDoc(doc(db, "bookings", id), {
      status: "Approved"
    });
    alert("✅ Booking Approved");
  } catch (error) {
    console.error(error);
    alert("Failed to approve booking.");
  }
};

window.rejectBooking = async (id) => {
  try {
    await updateDoc(doc(db, "bookings", id), {
      status: "Rejected"
    });
    alert("❌ Booking Rejected");
  } catch (error) {
    console.error(error);
    alert("Failed to reject booking.");
  }
};

window.deleteBooking = async (id) => {
  if (!confirm("Delete this booking?")) return;

  try {
    await deleteDoc(doc(db, "bookings", id));
    alert("🗑 Booking Deleted");
  } catch (error) {
    console.error(error);
    alert("Failed to delete booking.");
  }
};

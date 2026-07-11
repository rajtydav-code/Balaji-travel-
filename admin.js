import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  query,
  orderBy,
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
  apiKey: "YOUR_API_KEY",
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
const searchBox = document.getElementById("searchBox");

let bookings = [];

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
    bookings = [];
    table.innerHTML = "";

    let total = 0;
    let pending = 0;
    let approved = 0;
    let rejected = 0;

    snapshot.forEach((booking) => {

      const data = booking.data();

      bookings.push({
        id: booking.id,
        ...data
      });

      total++;

      const status = data.status || "Pending";

      if (status === "Pending") pending++;
      if (status === "Approved") approved++;
      if (status === "Rejected") rejected++;

      let statusColor = "orange";

      if (status === "Approved") statusColor = "lime";
      if (status === "Rejected") statusColor = "red";

      table.innerHTML += `
<tr>
<td>${data.name}</td>
<td>${data.mobile}</td>
<td>${data.pickup}</td>
<td>${data.drop}</td>
<td>${data.date}</td>
<td>${data.vehicle}</td>

<td style="color:${statusColor};font-weight:bold;">
${status}
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

    document.getElementById("totalBookings").innerText = total;
    document.getElementById("pendingBookings").innerText = pending;
    document.getElementById("approvedBookings").innerText = approved;
    document.getElementById("rejectedBookings").innerText = rejected;

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

searchBox.addEventListener("input", function () {

  const value = this.value.toLowerCase();
  const rows = table.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {

    const name = rows[i].cells[0]?.innerText.toLowerCase() || "";
    const mobile = rows[i].cells[1]?.innerText.toLowerCase() || "";

    if (name.includes(value) || mobile.includes(value)) {
      rows[i].style.display = "";
    } else {
      rows[i].style.display = "none";
    }

  }

});

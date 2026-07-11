// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({
        behavior: "smooth"
      });
  });
});

// ===== Booking Form =====
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    alert("Thank you! Your booking request has been submitted.");

    const phone = "919654778379";

    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const mobile = form.querySelector('input[placeholder="Mobile Number"]').value;
    const pickup = form.querySelector('input[placeholder="Pickup Location"]').value;
    const drop = form.querySelector('input[placeholder="Drop Location"]').value;
    const date = form.querySelector('input[type="date"]').value;
    const vehicle = form.querySelector("select").value;

    const message =
`Hello Bala Ji Travel,

New Booking Request

Name: ${name}
Mobile: ${mobile}
Pickup: ${pickup}
Drop: ${drop}
Date: ${date}
Vehicle: ${vehicle}`;

    window.open(
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
      "_blank"
    );

    form.reset();
  });
}

// ===== Scroll Animation =====
const cards = document.querySelectorAll(".service-card,.fleet-card");

window.addEventListener("scroll", () => {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }
  });
});

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.8s";
});

// ===== Back To Top Button =====
const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";

topBtn.style.position = "fixed";
topBtn.style.right = "20px";
topBtn.style.bottom = "20px";
topBtn.style.display = "none";
topBtn.style.borderRadius = "50%";
topBtn.style.width = "50px";
topBtn.style.height = "50px";
topBtn.style.fontSize = "20px";
topBtn.style.zIndex = "999";

document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

// ===== Current Year in Footer =====
const footer = document.querySelector("footer p");

if (footer) {
  footer.innerHTML =
    "© " + new Date().getFullYear() +
    " Bala Ji Travel. All Rights Reserved.";
    }
function calculateFare(){

let rate=document.getElementById("car").value;

let km=document.getElementById("km").value;

let total=rate*km;

document.getElementById("result").innerHTML="Estimated Fare : ₹"+total+" + Toll + State Tax + Parking + Driver Allowance";

}

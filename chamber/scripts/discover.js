

import businessData from "../data/places.mjs";

/* ===============================
   BUILD CARDS
================================== */

const container = document.querySelector("#discover-container");

businessData.forEach(place => {
    const card = document.createElement("section");
    card.classList.add("discover-card");

    // Assign named grid area
    card.style.gridArea = `card${place.id}`;

    card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
            <img src="${place.photo_url}" 
                 alt="${place.name}" 
                 loading="lazy"
                 class="discover-image">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn">Learn More</button>
    `;

    container.appendChild(card);
});

/* ===============================
   LOCAL STORAGE VISIT MESSAGE
================================== */

const visitMessage = document.getElementById("visit-message");

const now = Date.now();
const lastVisit = localStorage.getItem("lastVisit");

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const days = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));

    if (days < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${days} days ago.`;
    }
}

localStorage.setItem("lastVisit", now);

/* ===============================
   FOOTER
================================== */

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;
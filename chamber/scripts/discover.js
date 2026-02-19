

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
            <img ="${place.photo_url}" 
                 alt="${place.name}" 
                 loading="lazy"
                 class="discover-image"> 
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button class="learn-more-btn">Learn More</button>
    `; // ← Added missing backtick and semicolon

    container.appendChild(card);
});

const visitMessage = document.getElementById("visit-message");

// Check if visitMessage exists before using it
if (visitMessage) {
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
}

// Check if footer elements exist before using them
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

const lastModifiedElement = document.getElementById("last-modified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}
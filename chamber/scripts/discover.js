import businessData from "../data/places.mjs";

// DOM Elements
const discoverGrid = document.getElementById("discover-grid");
const visitorMessage = document.getElementById("visitor-message");
const visitorSection = document.getElementById("visitor-section");
const businessModal = document.getElementById("business-modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.querySelector(".modal-close");
const totalVisitsElement = document.getElementById("total-visits");
const currentYear = document.getElementById("current-year");
const lastModified = document.getElementById("last-modified");

// Storage Keys
const LAST_VISIT_KEY = "chamber_last_visit";
const TOTAL_VISITS_KEY = "chamber_total_visits";

// Counter
function updateVisitCounter() {
    let visits = parseInt(localStorage.getItem(TOTAL_VISITS_KEY)) || 0;
    visits++;
    localStorage.setItem(TOTAL_VISITS_KEY, visits);
    totalVisitsElement.textContent = visits;
}

// Visitor Message
function displayVisitorMessage() {
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();

    let message = "";

    if (!lastVisit) {
        message = "Welcome! Let us know if you have questions.";
    } else {
        const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        message = days === 0 ? "Back so soon! Awesome!" :
            `You last visited ${days} day(s) ago.`;
    }

    visitorMessage.innerHTML = `
        <div class="message-box">
            ${message}
        </div>
    `;

    localStorage.setItem(LAST_VISIT_KEY, now);
}

// Create Cards
function createDiscoveryCards() {
    discoverGrid.innerHTML = "";

    businessData.forEach((b) => {
        const card = document.createElement("article");
        card.className = "discovery-card";

        card.innerHTML = `
            <h2>${b.name}</h2>
            <img src="${b.photo_url}" alt="${b.name}">
            <p>${b.description}</p>
            <button data-id="${b.id}">Learn More</button>
        `;

        discoverGrid.appendChild(card);
    });

    document.querySelectorAll(".discovery-card button").forEach(btn => {
        btn.addEventListener("click", () => showBusinessDetails(btn.dataset.id));
    });
}

// Modal
function showBusinessDetails(id) {
    const b = businessData.find(x => x.id == id);

    modalBody.innerHTML = `
        <h2>${b.name}</h2>
        <p>${b.description}</p>
        <p><strong>Address:</strong> ${b.address}</p>
        <p><strong>Hours:</strong> ${b.hours}</p>
    `;

    businessModal.showModal();
}

modalClose.addEventListener("click", () => businessModal.close());

// Footer Updates
function updateFooterInfo() {
    currentYear.textContent = new Date().getFullYear();
    lastModified.textContent = document.lastModified;
}

// Init
function init() {
    updateVisitCounter();
    displayVisitorMessage();
    createDiscoveryCards();
    updateFooterInfo();
}

document.addEventListener("DOMContentLoaded", init);

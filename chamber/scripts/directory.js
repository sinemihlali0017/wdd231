const membersContainer = document.querySelector("#members");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuBtn = document.querySelector("#menu-btn");
const nav = document.querySelector("#main-nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// Footer dates
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

// Fetch JSON
async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${member.logo}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();

// Grid / List Toggle
gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});

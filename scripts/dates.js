




// Display the current year
document.getElementById("year").textContent = new Date().getFullYear();

// Format the last modified date
const modifiedDate = new Date(document.lastModified);

document.getElementById("last-modified").textContent =
    modifiedDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
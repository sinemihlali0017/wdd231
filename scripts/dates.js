const year = new Date().getFullYear();


document.getElementById("copyright").textContent =
    `©️ ${year} WDD 231 - Web development 1 Sinemihlali Mahlathini  South Africa`;


const lastupdated = new Date(document.lastModified);


const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = lastupdated.toLocaleDateString('en-US', options);


document.getElementById("lastupdated").innerHTML = `Last Updated: ${formattedDate}`;



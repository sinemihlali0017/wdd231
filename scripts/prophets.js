

const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getprophetData(url) {

    const respons = await fetch();

    const data = await respons.json;

    console.table(data.prophets);


}




getprophetData();



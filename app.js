// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector("form");
const input = document.querySelector("input");
const errorMsg = document.querySelector(".error-msg");
const loader = document.querySelector(".loader");
const resultsDisplay = document.querySelector(".results-display");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  if (!input.value.length) {
    errorMsg.textContent = "Please fill in the form ";
    return;
  } else {
    resultsDisplay.textContent = "";
    loader.style.display = "flex";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    const data = await response.json();
    createCards(data.query.search);
  } catch (error) {
    console.log(error);
  }
}

function createCards(data) {
  console.log(data);
  if (!data.length) {
    errorMsg.textContent = "Sorry, there is no result for this search";
    return;
  }

  data.forEach((element) => {
    const url = `https://en.wikipedia.org/?curdi=${element.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `   
    <h3 class="result-title">
      <a href="${url}" target="_blank">${element.title}</a>
    </h3>
    <a href="${url}" class="result-link" target="_blank">${url}</a>
    <span class="result-snippet">${element.snippet}</span>`;
    resultsDisplay.appendChild(card);
  });
}

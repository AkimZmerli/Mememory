// --------------- MEMORY GAME --------------- //

// --------------- SET UP GAME --------------- //

const appDiv = document.getElementById("app") as HTMLDivElement;

const numCards = 24; // total number of cards

// create new array with IDs for cards
let memoryCards: number[] = [];
for (let i = 1; i <= numCards; i++) {
  memoryCards.push(i);
}

// shuffle the array
memoryCards.sort(() => Math.random() - 0.5);

// fill board with cards
for (let i of memoryCards) {
  // create new div
  let newCard = document.createElement("div") as HTMLDivElement;
  // add class to div
  newCard.classList.add("memory__card");
  newCard.innerHTML = `<img src="/img/${
    (i % 12) + 1
  }.svg" id=${i} class="hidden" />`;
  newCard.addEventListener("click", () => handleClick(i));
  // append class to appDiv
  appDiv.appendChild(newCard);
}

// --------------- RUN GAME --------------- //
let firstCard: HTMLElement;
let secondCard: HTMLElement;
let showCounter = 0; // counter for showing cards
let isShowing = false; // var for keeping track of showing cards

// Scoring functionality

async function handleClick(id: number) {
  if (isShowing) {
    return;
  }
  if (showCounter % 2 === 0) {
    //first Card
    firstCard = document.getElementById(id.toString()) as HTMLElement;
    firstCard.classList.toggle("hidden");
  } else {
    // second Card
    secondCard = document.getElementById(id.toString()) as HTMLElement;
    secondCard.classList.toggle("hidden");
    isShowing = true;
    await delay(2000);
    checkMatch();
    isShowing = false;
  }
  showCounter++;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkMatch() {
  console.log(firstCard.id);
  console.log(secondCard.id);
  let firstID = Number(firstCard.id);
  let secondID = Number(secondCard.id);
  if (
    // firstCard.id - secondCard.id === 12 ||
    // secondCard.id - firstCard.id === -12
    Math.abs(firstID - secondID) === 12
  ) {
    firstCard.parentElement!.innerHTML = "<img src='img/check.svg'/>";
    secondCard.parentElement!.innerHTML = "<img src='img/check.svg'/>";
  } else {
    setTimeout(() => {
      firstCard.classList.toggle("hidden");
      secondCard.classList.toggle("hidden");
    });
  }
  // check if first and second Card are matching
  // if so: replace cards with a Check
  // else: hide cards again
}

const board = document.getElementById('game-board');
const status = document.getElementById('status');
const letters = [...'AABBCCDDEEFFGGHH'];
let flippedCards = [];
let matchedCount = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledLetters = shuffle(letters);

shuffledLetters.forEach((letter, index) => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.letter = letter;
  card.dataset.index = index;
  card.innerText = '';
  card.addEventListener('click', flipCard);
  board.appendChild(card);
});

function flipCard(e) {
  const card = e.currentTarget;
  if (flippedCards.length === 2 || card.classList.contains('matched') || card.classList.contains('flipped')) {
    return;
  }

  card.classList.add('flipped');
  card.innerText = card.dataset.letter;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.letter === card2.dataset.letter) {
      card1.classList.add('matched');
      card2.classList.add('matched');
      flippedCards = [];
      matchedCount += 1;
      if (matchedCount === 8) {
        status.innerText = 'You win!';
      }
    } else {
      setTimeout(() => {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerText = '';
        card2.innerText = '';
        flippedCards = [];
      }, 1000);
    }
  }
}

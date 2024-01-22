// Pt. 3 - Write HTML & JS to pull cards from the same deck until the deck is empty (see also: cards.html)

let deckId = null;

// Function to create a new deck
function createNewDeck() {
    axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => {
            deckId = response.data.deck_id;
        })
        .catch(error => {
            console.error('Error creating new deck:', error);
        });
}

// Function to draw a card
function drawCard() {
    if (!deckId) return;

    axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => {
            if (response.data.cards.length === 0) {
                alert("No more cards in the deck.");
                return;
            }

            const card = response.data.cards[0];
            displayCard(card);
        })
        .catch(error => {
            console.error('Error drawing a card:', error);
        });
}

// Function to display the card
function displayCard(card) {
    const cardContainer = document.getElementById('cardContainer');
    const cardImage = document.createElement('img');
    cardImage.src = card.image;
    cardImage.alt = `${card.value} of ${card.suit}`;
    cardImage.id = 'card';
    cardContainer.innerHTML = ''; // Clear previous card
    cardContainer.appendChild(cardImage);
}

// Event listener for the draw card button
document.getElementById('drawCard').addEventListener('click', drawCard);

// Create a new deck when the page loads
window.onload = createNewDeck;

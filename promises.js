// Part One: Number Facts

const numAPI = 'http://numbersapi.com';

// 1. Function to pull a fact for one number
function numFact(number) {
    let url = `${numAPI}/${number}/trivia`;
    axios.get(url)
        .then(res => {
            console.log(`Fact for number ${number}: ${res.data}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

numFact(47);

// 2. Function to pull a fact for multiple numbers
function numsFact(numbers) {
    let url = `${numAPI}/${numbers.join(',')}/trivia`;
    axios.get(url)
        .then(res => {
            const numFacts = res.data;
            for (let num in numFacts) {
                console.log(`Fact for number ${num}: ${numFacts[num]}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

numsFact([7, 11, 29]); 

// Function to pull multiple facts for one number
function numFacts(number) {
    const count = 4; // number of facts to pull
    for (let i = 0; i < count; i++) {
        let url = `${numAPI}/${number}/trivia`;
        axios.get(url)
            .then(res => {
                console.log(`Fact ${i + 1} for number ${number}: ${res.data}`);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}

numFacts(47); 

//Part Two: Deck of Cards

// 1. Function to pull a single card from a deck

axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => {
        const deckId = response.data.deck_id; // Shuffle & get deck ID from the response
                return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); // Draw a single card from the shuffled deck

    })
    .then(response => {
        const card = response.data.cards[0]; // Get the card from the response
        console.log(`${card.value} of ${card.suit}`); // Log the card
    })
    .catch(error => {
        console.error('Error:', error);
    });

// 2. Function to pull two cards from the same deck

axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(response => {
        const deckId = response.data.deck_id; // Shuffle & get deck ID from the response
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`); // Draw a single card from the shuffled deck
    })
    .then(response => {
        const firstCard = response.data.cards[0]; // Store the first card
        const deckId = response.data.deck_id;
        return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`) // Draw the second card from the same deck
                    .then(secondResponse => {
                        const secondCard = secondResponse.data.cards[0]; // Store the second card

                        // Now console.log both cards
                        console.log(`First card: ${firstCard.value} of ${firstCard.suit}`);
                        console.log(`Second card: ${secondCard.value} of ${secondCard.suit}`);
                    });
    })
    .catch(error => {
        console.error('Error:', error);
    });

// 3. HTML & JS to pull cards from the same deck until the deck is empty (see also: cards.html)

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

// Gets all Pokémon
function getAllPokemon() {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(response => response.data.results)
        .catch(error => console.error('Error fetching Pokémon list:', error));
}

// Gets details of a single Pokémon
function getPokeDetails(url) {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => console.error(`Error fetching details for Pokémon: ${url}`, error));
}

// Gets the species description IN ENGLISH!
function getSpeciesDescription(speciesUrl) {
    return axios.get(speciesUrl)
        .then(response => {
            const flavorTextEntries = response.data.flavor_text_entries;
            const englishEntry = flavorTextEntries.find(entry => entry.language.name === 'en');
            return englishEntry ? englishEntry.flavor_text : 'No English description available.';
        })
        .catch(error => console.error(`Error fetching species description: ${speciesUrl}`, error));
}

// Picks three Pokémon at random and logs their name/description
function logThreePkmn() {
    getAllPokemon().then(pokemonList => {
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonList.length);
            const pokemon = pokemonList[randomIndex];
            getPokeDetails(pokemon.url).then(details => {
                const pokemonName = details.name;
                getSpeciesDescription(details.species.url).then(description => {
                    console.log(`${pokemonName}: ${description}`);
                });
            });
        }
    });
}

// Function to create a card for each Pokémon
function createPokemonCard(pokemonName, imageUrl, description) {
    const card = document.createElement('div');
    card.className = 'card';

    const nameElement = document.createElement('h2');
    nameElement.textContent = pokemonName;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `Image of ${pokemonName}`;
    imageElement.className = 'pokemon-image';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    card.appendChild(nameElement);
    card.appendChild(imageElement);
    card.appendChild(descriptionElement);

    document.getElementById('pokemonDisplay').appendChild(card);
}

// Modified logThreePkmn function
function displayThreePkmn() {
    document.getElementById('pokemonDisplay').innerHTML = ''; // Clear previous content
    getAllPokemon().then(pokemonList => {
        for (let i = 0; i < 3; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonList.length);
            const pokemon = pokemonList[randomIndex];
            getPokeDetails(pokemon.url).then(details => {
                const pokemonName = details.name;
                const imageUrl = details.sprites.front_default;
                getSpeciesDescription(details.species.url).then(description => {
                    createPokemonCard(pokemonName, imageUrl, description);
                });
            });
        }
    });
}

document.getElementById('generatePokemon').addEventListener('click', displayThreePkmn);
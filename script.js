const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weightSpan = document.getElementById("weight");
const heightSpan = document.getElementById("height");
const imgContainer = document.getElementById("img-container");
const typesDiv = document.getElementById("types");

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";


const getPokemonByNameOrId = async (str) => {

    try {
        const res = await fetch(`${pokemonUrl}/${str}`);
        const pokemonData = await res.json();
        showPokemon(pokemonData);
    }
    catch (err) {
        console.log(err);
        alert("Pokémon not found");
    }
}


const showPokemon = (pokemonData) => {

    const { height, id, name, sprites, stats, types, weight } = pokemonData;

    pokemonName.innerText = name.toUpperCase();
    pokemonId.innerText = `#${id}`;
    weightSpan.innerText = `Weight: ${weight}`;
    heightSpan.innerText = `Height: ${height}`;
    
    typesDiv.innerHTML = "";
    [...types].forEach((item) => {
        const { type } = item;
        typesDiv.innerHTML += `<span class="tags">${type.name.toUpperCase()}</span>`;
    });

    [...stats].forEach((item) => {
        const { base_stat, stat } = item;
        document.getElementById(stat.name).innerText = base_stat;
    });

    imgContainer.innerHTML = `<img id="sprite" src="${sprites.front_default}" />`;
}


searchBtn.addEventListener("click", () => {
    getPokemonByNameOrId(searchInput.value.toLowerCase());
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getPokemonByNameOrId(searchInput.value.toLowerCase());
    }
})
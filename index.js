//wanneer html geladen is event listener
document.addEventListener("DOMContentLoaded", () =>{
    let searchbutton = document.querySelector('#searchfield_button')
    //luistert naar kliks
    searchbutton.addEventListener('click', fetchPokemonByName)
})

function render(){
    let allPokemonsC = document.querySelector('#poke-container')
    allPokemonsC.innerText = "";
    //haalt params uit url 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pokemon_name = urlParams.get('searchfield_input');
    // console.log(pokemon_name);

    if(pokemon_name == undefined || pokemon_name == ""){
        fetchPokemon();
    } else{
        fetchPokemonByName(pokemon_name);
    }
}

//fetch alle pokemon
function fetchPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon){
        console.log("testtttt")
        allpokemon.results.forEach(function(pokemon){
            fetchPokeData(pokemon);
        })
    })
}

//fetch obv naam
function fetchPokemonByName(name){
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(response => response.json())
    .then(function(allpokemon){
        console.log("Line 64");
        console.log(allpokemon);
        // fetchPokeData(allpokemon);
        renderPokemonByName(allpokemon);
    })
}
//zet pokemon op pagina
function renderPokemonByName(pokeData){
    let allPokemonsC = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") 
    pokeContainer.classList.add('card');

    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4') 
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`
   
    let pokeTypes = document.createElement('ul')
    createTypes(pokeData.types, pokeTypes) 

    let pokeAbilities = document.createElement('ul')
    createAbilitiesByName(pokeData.abilities, pokeAbilities) 

    pokeContainer.append(pokeName, pokeNumber, pokeTypes, pokeAbilities);
    allPokemonsC.appendChild(pokeContainer);
}
function createAbilitiesByName(abilities, ul){
    abilities.forEach(function(ability){
        let abilityLi = document.createElement('li');
        abilityLi.innerText = ability['ability']['name'];
        ul.append(abilityLi)
    })
}

//haalt data van pokemon
function fetchPokeData(pokemon){
    let url = pokemon.url
    fetch(url)
    .then(response => response.json())
    .then(function(pokeData){
        renderPokemon(pokeData)
    })
}

//zet pokemon op pagina
function renderPokemon(pokeData){
    let allPokemonsC = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div") 
    pokeContainer.classList.add('card');

    createPokeImage(pokeData.id, pokeContainer);

    let pokeName = document.createElement('h4') 
    pokeName.innerText = pokeData.name

    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = `#${pokeData.id}`
   
    let pokeTypes = document.createElement('ul')

    createTypes(pokeData.types, pokeTypes) 

    pokeContainer.append(pokeName, pokeNumber, pokeTypes);
    allPokemonsC.appendChild(pokeContainer);
}
//werkt met pokemontype
function createTypes(types, ul){
    types.forEach(function(type){
        let typeLi = document.createElement('li');
        typeLi.innerText = type['type']['name'];
        ul.append(typeLi)
    })
}
//haalt pokemonimage
function createPokeImage(pokeID, containerDiv){
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')

    let pokeImage = document.createElement('img')
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`

    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}
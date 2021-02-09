const types = [
    'fire',
    'grass',
    'electric',
    'water',
    'ground',
    'rock',
    'fairy',
    'poison',
    'bug',
    'dragon',
    'psychic',
    'flying',
    'fighting',
    'normal',
    'ghost',
    'ice'
];

const POKEMON_COUNT = 20;

const cards = document.querySelector('.cards');

const cardHTML = ` 
    <div class="card" id="card-{id}"><!-- Card -->
        <div class="title">
            <h2>{name}</h2>
            <small># {id}</small>
        </div>
        <div class="img bg-{type}">
        <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="{name}" />
        </div>
        <div class="type {type}">
            <p>{type}</p>
        </div>
    </div><!-- Card -->
`

const getType = (type_data) => {
    const apiTypes = type_data.map( type => type.type.name );/*Map(), mapeou dentro de um array de objetos, todos
        os objetos que tinham o diretório 'type.name', e retornou os nomes em array. Útil para objetos com propriedades similares num array*/
    const type = apiTypes.find((type) => {
        if(types.includes(type)){
            return type;
        }else{
            return 'nothing bro';
        }
    });
    return type;
};

const fetchPokemon = async (number) => {
    if(number===undefined) return;
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    const response = await fetch(url).then( response => response.json());//Conversão para JSON após o recebimento da resposta da API.
    const { id, name, types } = response;/*Para pegar uma propriedade direta de um JSON para uma variável
    pode se usar o '{nome_propriedade}' só funciona se estiver entre chaves.*/
    let type =  getType(types);
    if(type==='nothing bro'){
        type = 'Unknow'; 
    }
    return { id, name, type };
};

const fetchPokemons= async () => {
    for(let i=1; i<=POKEMON_COUNT; i++){
        const pokemon = await fetchPokemon(i);
        createPokemonCard(pokemon);
    }
}

const replacer = (text, source, destination)=>{
    const regex = new RegExp(source, 'gi');
    return text.replace(regex, destination);
}

const createPokemonCard = (pokemon)=>{
    const {id, name, type} = pokemon;
    let newCard = replacer(cardHTML, `\{id\}`, id);
    newCard = replacer(newCard, `\{name\}`, name);
    newCard = replacer(newCard, `\{type\}`, type);
    cards.innerHTML+=newCard;
}

fetchPokemons();

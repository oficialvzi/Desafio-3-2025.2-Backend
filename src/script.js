//função de mudar imagem pelo id e pela url
function changeImage(id, url) {
  document.getElementById(id).src = url;
}
//função de mudar texto pelo id e pelo texto
function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

//urls da api
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292";
const detail_url = "https://pokeapi.co/api/v2/pokemon/";

//ids dos elementos html
const id_img = "img_sprite_front_default";
const id_name = "name";

//variaveis globais
let listaPokemon = [];
let pokemonAtual = 0;

//funcaoo para pegar a lista de pokemons da API
async function pegarListaPokemon() {
  const response = await fetch(url);
  const data = await response.json();
  listaPokemon = data.results; //armazenar a lista de pokemons na variavel global
}

//funcaoo para mostrar o pokemon atual
async function mostrarPokemon(pokemon) {
  //mostra "carregando..." enquanto busca os dados para ficar mais interativo
  changeText(id_name, "Carregando\n...");
  changeImage(id_img, "");
  //pega os detalhes do pokemon específico
  const response = await fetch(detail_url + pokemon);
  const data = await response.json();
  //troca o nome e imagem do pokemon atual
  changeText(id_name, data.name);
  changeImage(id_img, data.sprites.front_default);
}

//funcoes para os botoes anterior e proximo
function previousPokemon() {
  pokemonAtual--; //diminui o index do pokemon atual
  //wrap-around
  if (pokemonAtual < 0) {
    pokemonAtual = listaPokemon.length - 1;
  }
  //troca o nome e imagem do pokemon atual
  const nomePokemon = listaPokemon[pokemonAtual].name;
  mostrarPokemon(nomePokemon);
}

function nextPokemon() {
  pokemonAtual++; //aumenta o index do pokemon atual
  //wrap-around
  if (pokemonAtual >= listaPokemon.length) {
    pokemonAtual = 0;
  }
  //troca o nome e imagem do pokemon atual
  const nomePokemon = listaPokemon[pokemonAtual].name;
  mostrarPokemon(nomePokemon);
}

//funcao principal para iniciar na ordem correta
async function main() {
  await pegarListaPokemon(); //pega a lista de pokemons
  const primeiroPokemon = listaPokemon[pokemonAtual].name; //pega o nome do primeiro pokemon
  await mostrarPokemon(primeiroPokemon); //mostra o primeiro pokemon
}

main(); //inicia o programa

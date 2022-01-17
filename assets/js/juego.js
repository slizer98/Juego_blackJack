/*
 2C - two of clubs
 2D - two of diamonds
 2H - two of hearts
 2S - two of spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];

// Esta funcion crea una nueva baraja
const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        
        }

    }
    for(let tipo of tipos){
        for(let especial of especiales){
                deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    console.log(deck);
    return deck 
}

crearDeck();

// Esta funcion me permite tomar una carta de la baraja
const pedirCarta = () => {
    if(deck.length === 0){
        throw 'No hay cartas en la baraja';
    }
    carta = deck.pop();
    return carta;
}
pedirCarta();

// Saber el valor de una carta
const valorCarta = (carta) => {
    let valor = carta.substring(0, carta.length - 1);

    console.log(carta)
    return (isNaN(valor)) ? 
           (valor === 'A') ?11 : 10 
           : valor * 1;
}
const valor = valorCarta(pedirCarta());
console.log({valor});
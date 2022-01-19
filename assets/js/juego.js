/*
 2C - two of clubs
 2D - two of diamonds
 2H - two of hearts
 2S - two of spades
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A'];
let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias del HTML
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntajeJugador = document.querySelectorAll('small');

const btnNuevo = document.getElementById('btnNuevo');
const btnPedir = document.getElementById('btnPedir');
const btnDetener = document.getElementById('btnDetener');

const resultado = document.querySelector('.resultado');


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

    return (isNaN(valor)) ? 
           (valor === 'A') ?11 : 10 
           : valor * 1;
}

// Turno computadora
const turnoComputadora = (puntosMinimos) => {
    do{
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntajeJugador[1].innerHTML = puntosComputadora;

    // Agregar carta a la mano del jugador
    // <img class="carta" src="./assets/cartas/2C.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.appendChild(imgCarta);

    if(puntosMinimos > 21){
        break;
    }

    }while((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));
    final();
}


// Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntajeJugador[0].innerHTML = puntosJugador;

    // Agregar carta a la mano del jugador
    // <img class="carta" src="./assets/cartas/2C.png" alt=""></img>
    const imgCarta = document.createElement('img');
    imgCarta.classList.add('carta');
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasJugador.appendChild(imgCarta);

    if(puntosJugador > 21){
        estilosBtn();
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        estilosBtn()
        turnoComputadora(puntosJugador);
    }
})

btnDetener.addEventListener('click', () => {
    estilosBtn();
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntajeJugador[0].innerHTML = 0;
    puntajeJugador[1].innerHTML = 0;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    btnPedir.style.textDecoration = 'none';
    btnDetener.style.textDecoration = 'none';
    btnPedir.style.backgroundColor = 'gray';
    btnDetener.style.backgroundColor = 'gray';
    resultado.innerHTML = '';
})

function estilosBtn(){
    btnPedir.disabled = true;
    btnPedir.style.textDecoration = 'line-through';
    btnDetener.disabled = true;
    btnDetener.style.textDecoration = 'line-through';
    if(puntosJugador <= 21){
        btnPedir.style.backgroundColor = 'green';
        btnDetener.style.backgroundColor = 'green';
        return 0;
    } else{
        btnPedir.style.backgroundColor = 'red';
        btnDetener.style.backgroundColor = 'red';
    }
}


function final(){

    const parrafo = document.createElement('p');
    let mensaje = '';
    
    if(puntosJugador > 21 || puntosComputadora > puntosJugador && puntosComputadora <= 21){
        mensaje = 'Gana computadora';
    }
    else if(puntosComputadora > 21 || puntosJugador > puntosComputadora && puntosJugador <= 21){
        mensaje = 'Gana jugador';
    }
    else if(puntosJugador === 21 && puntosComputadora === 21 || puntosJugador === puntosComputadora){
        mensaje ='Empate';
    } else{
        mensaje = 'Algo anda mal';   
    }
    parrafo.textContent = mensaje;
    resultado.appendChild(parrafo);
    setTimeout(() => { 
        resultado.style.display = 'flex';
    }, 1500);
    setTimeout(() => { 
        resultado.style.display = 'none';
    }, 3000);
}


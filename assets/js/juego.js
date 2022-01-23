

// Patron modulo
const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['J', 'Q', 'K', 'A'];

    let puntosJugadores = [];
    
    // Referencias del HTML
    const divCartasJugadores =document.querySelectorAll('.divCartas'),
         puntajeJugador = document.querySelectorAll('small');

    const btnNuevo = document.getElementById('btnNuevo'),
          btnPedir = document.getElementById('btnPedir'),
          btnDetener = document.getElementById('btnDetener');

    const resultado = document.querySelector('.resultado');

    // Esta funcion inicializa el juego
    const inicicializarJuego = (numJugadores = 2) =>{
        deck = crearDeck();
        mostrarBotones();
        puntosJugadores = [];
        for(let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }
        puntajeJugador.forEach(puntaje => puntaje.innerText = 0);

        divCartasJugadores.forEach(divCartas => divCartas.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        
        btnPedir.style.textDecoration = 'none';
        btnDetener.style.textDecoration = 'none';
        
        btnPedir.style.backgroundColor = 'gray';
        btnDetener.style.backgroundColor = 'gray';

        resultado.innerText = '';
    }

    // Esta funcion crea una nueva baraja
    const crearDeck = () => {
        deck = [];
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
        return _.shuffle(deck);
         
    }

    // Esta funcion me permite tomar una carta de la baraja
    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en la baraja';
        }
         
        return deck.pop();
    }
    // pedirCarta();

    // Saber el valor de una carta
    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor)) ? 
            (valor === 'A') ?11 : 10 
            : valor * 1;
    }

    // Turno: 0 = jugador, ultimo = computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] += valorCarta(carta);
        puntajeJugador[turno].innerHTML = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    // Esta funcion me permite mostrar las cartas en el HTML
    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.classList.add('carta');
        imgCarta.src = `assets/cartas/${carta}.png`;
        divCartasJugadores[turno].appendChild(imgCarta);
    }

    // Turno computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);

        }while((puntosComputadora < puntosMinimos) && (puntosComputadora <= 21));
        final();
    }

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);
        if(puntosJugador > 21){
            estilosBtn();
            turnoComputadora();
        }else if(puntosJugador === 21){
            estilosBtn()
            turnoComputadora(puntosJugadores[0]);
        }
    })

    btnDetener.addEventListener('click', () => {
        estilosBtn();
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicicializarJuego();
    })

    function mostrarBotones(){
        btnNuevo.style.display = 'none';
        btnPedir.style.display = 'block';
        btnDetener.style.display = 'block';
    }

    function estilosBtn(){

        btnPedir.disabled = true;
        btnPedir.style.textDecoration = 'line-through';
        btnDetener.disabled = true;
        btnDetener.style.textDecoration = 'line-through';
        if(puntosJugadores[0] <= 21){
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
        const [puntosJugador, puntosComputadora] = puntosJugadores;
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
        }, 1000);
        setTimeout(() => { 
            resultado.style.display = 'none';
            inicicializarJuego();
        }, 2000);
    }
    return {
        nuevoJuego: inicicializarJuego
    };
})();



//defino 2 variables, una para el uso del mapa cargado de googlemaps, otra para guardar la info de cada lugar, segun los datos del mapa en un array
let mapaActual;
let marcadores = [];


//ESTO SI NO SE COMO LO VAMOS A EXPLICAR!!! XD lo que hace esto es abrir el globo de un marcador, con solo clickear su nombre en la lista.
const setListener=()=>{
    document.querySelectorAll(".estacionamiento_individual").forEach((estaNombre, indice)=>{
        estaNombre.addEventListener("click", ()=>{
            google.maps.event.trigger(marcadores[indice], "click")
        })
    })
}




//funcion que pasa por cada dato del objeto parking(ubicado en el archivo separado mapa_datos.js), y agrega a una variable, el nombre de cada lugar, y luego lo presenta dentro del div con id "estaNOMBRES"
const mostrarListaEstacionamiento = ()=>{
    let estacionamientoHTML = "";
    parking.forEach(lugar=>{
        estacionamientoHTML += `<h4 class="estacionamiento_individual">${lugar.nombre}</h4>`
    })
    document.getElementById("estaNombres").innerHTML = estacionamientoHTML;
}

//funcion que crea los marcadores de cada ubicacion, con sus coordenadas, icono y mapa, y le agrega un listener click para abrir la ventana de informacion, luego lo guarda en el array marcador_
const crearMarcadoresEstacionamientos = (coord, nombre) => {
    let etiqueta = `<h3> ${nombre} </h3>`
    const marcador_ = new google.maps.Marker({
        position: coord,
        map: mapaActual,
        icon: "./Media/img/img_icono_mapa_32.png",
    })
    google.maps.event.addListener(marcador_, "click", () => {
        marcadorInfo.setContent(etiqueta);
        marcadorInfo.open(mapaActual, marcador_);
    })

    marcadores.push(marcador_);
}

//esta funcion lee cada dato del objeto parking, y lee lat y long e invoca a la funcion que crea estos marcadores
const crearMarcadoresEsta = () => {
    let limitesMapa = new google.maps.LatLngBounds();//dificil de explicar 15
    parking.forEach(esta => {
        let coord = new google.maps.LatLng(esta.lat, esta.lng);
        let nombre = esta.nombre;
        limitesMapa.extend(coord); //dificil de explicar 15
        crearMarcadoresEstacionamientos(coord, nombre);
        mapaActual.fitBounds(limitesMapa); //dificil de explicar 15
    })
}


//funcion inicial que inicia la libreria de googlemaps para usar el mapa y sus metodos, lo carga en el elemento de id "mapa_main", centrado en buenos aires
async function initMap() {
    let buenosAires = { lat: -34.592, lng: -58.451 };
    const { Map } = await google.maps.importLibrary("maps");

    mapaActual = new google.maps.Map(document.getElementById("mapa__main"), {
        center: buenosAires,
        zoom: 13,
    })

    //esto crea un elemento infowindow, que luego se usa para mostrar los datos de cada marcador
    marcadorInfo = new google.maps.InfoWindow();

    //aqui invocamos a la funcion de crear marcadores, y luego a la que crea la lista de los mismos y la carga en el div flotante
    crearMarcadoresEsta();
    mostrarListaEstacionamiento();

    //esta siguiente funcion, hace que si clickeamos el nombre del estacionamiento en la lista, abre la ventana de info en el mapa.
    setListener();

}

// aca se inicializa el mapa con la funcion principal.
initMap();


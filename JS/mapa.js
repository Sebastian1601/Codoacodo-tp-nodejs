/* para este punto, ya está cargado los datos de cada lugar en el archivo mapa_datos.js */


// creo primero la variable que va a guardar la información del mapa

let mapaActual;

// creo el array que va a guardar la información de los distintos lugares

let marcadores = []

/* esta funcion recibe 2 parametros, nombre y coord, y los usa para crear un marcador de google, con las coordenadas, en el mapa actual y guardarlos en el array
 */
const crearCadaMarcador = (nombre, coord) => {
  let html = `<h3>${nombre}</h3>`
  let marcador_ = new google.maps.Marker({
    position: coord,
    map: mapaActual,
    icon: "./Media/img/img_icono_mapa_32.png",
  })
  google.maps.event.addListener(marcador_, "click", () => {
    infoBubble.setContent(html);
    infoBubble.open(mapaActual, marcador_);
  marcadores.push(marcador_)
  })
}


/* esta funcion se usa para con cada elemento del objeto parking, obtener estos datos y crear un marcador nuevo invocando la funcion definida anteriormente
 */
const crearMarcadoresEstacionamientos = () => {
  parking.forEach(lugar => {
    let coord = new google.maps.LatLng(lugar.lat, lugar.lng);
    let name = lugar.nombre;
    console.log(name + " " + coord);
    crearCadaMarcador(name, coord);
  })
}


/* esta funcion se usa para inicializar el mapa de google, y definir un punto inicial, en este caso buenos buenosAires, toma el div de clase mapa__main y le mete el mapa como elemento interno
 */
async function initMap() {
  let buenosAires = { lat: -34.592, lng: -58.451 }
  const { Map } = await google.maps.importLibrary("maps");

  mapaActual = new Map(document.getElementById("mapa__main"), {
    center: buenosAires,
    zoom: 12,
  });

  const marcadorInicial = new google.maps.Marker({
    map: mapaActual,
    position: buenosAires,
  })
  /*   aqui al inicializar, creo los marcadores de los elementos que tenga en el archivo "mapa_datos.js" */
  crearMarcadoresEstacionamientos();

  var infoBubble = new google.maps.InfoWindow();
}

initMap();




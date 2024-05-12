/* para este punto, ya está cargado los datos de cada lugar en el archivo mapa_datos.js */




let mapaActual;
let marcadores=[]

const crearCadaMarcador = (nombre,coord) => {
    let marcador_ = new google.maps.Marker({
        position:coord,
        map:mapaActual,
        icon:"./Media/img/img_icono_mapa.png",
})
    marcadores.push(marcador_)
}

const crearMarcadoresEstacionamientos = () => {
    parking.forEach(lugar=>{
            let coord = new google.maps.LatLng(lugar.lat, lugar.lng);
            let name = lugar.nombre;
            console.log(name + " " + coord);
            crearCadaMarcador(name, coord);
})

}



async function initMap() {
    let buenosAires = { lat: -34.592, lng: -58.451}
  const { Map } = await google.maps.importLibrary("maps");

  mapaActual = new Map(document.getElementById("mapa__main"), {
    center: buenosAires,
    zoom: 12,
  });

  const marcadorInicial = new google.maps.Marker({
    map:mapaActual,
    position: buenosAires,
})
crearMarcadoresEstacionamientos();
}

initMap();




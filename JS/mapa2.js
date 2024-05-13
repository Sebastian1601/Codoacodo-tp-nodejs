let mapaActual;
let marcadores = [];

const mostrarListaEstacionamiento = ()=>{
    let estacionamientoHTML = "";
    parking.forEach(lugar=>{
        estacionamientoHTML += `<h4>${lugar.nombre}</h4>`
    })
    document.getElementById("estaNombres").innerHTML = estacionamientoHTML;
}


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


const crearMarcadoresEsta = () => {
    parking.forEach(esta => {
        let coord = new google.maps.LatLng(esta.lat, esta.lng);
        let nombre = esta.nombre;
        crearMarcadoresEstacionamientos(coord, nombre);
    })
}

async function initMap() {
    let buenosAires = { lat: -34.592, lng: -58.451 };
    const { Map } = await google.maps.importLibrary("maps");

    mapaActual = new google.maps.Map(document.getElementById("mapa__main"), {
        center: buenosAires,
        zoom: 12,
    })

    marcadorInfo = new google.maps.InfoWindow();

    crearMarcadoresEsta();
    mostrarListaEstacionamiento();
}

initMap();


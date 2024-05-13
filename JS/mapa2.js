let mapaActual;
let marcadores= [];


const crearMarcadoresEstacionamientos = (coord, nombre) =>{
    const marcador_ = new google.maps.Marker({
        position:coord,
        map: mapaActual,
        icon:"./Media/img/img_icono_mapa_32.png",
    })
    marcadores.push(marcador_);
}


const  crearMarcadoresEsta = () =>{
    parking.forEach(esta=>{
        let coord = new google.maps.LatLng(esta.lat, esta.lng);
        let nombre = esta.nombre;
        crearMarcadoresEstacionamientos(coord, nombre);
    })
}

async function initMap(){
    let buenosAires = {lat: -34.592, lng: -58.451};
    const { Map } = await google.maps.importLibrary("maps");

    mapaActual = new google.maps.Map(document.getElementById("mapa__main"),{
        center:buenosAires,
        zoom:12,
    })

    const marcadorInicial = new google.maps.Marker({
        position:buenosAires,
        map:mapaActual,
    })

    crearMarcadoresEsta();

    const marcadorInfo = new google.maps.InfoWindow();
    let html = `<h3>Buenos Aires</h3>`
    marcadorInfo.setContent(html);
    marcadorInfo.open(mapaActual, marcadorInicial);
}

initMap();


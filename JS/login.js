//trabajando por 2 archivos separados, ya puedo importar la funcion que todavia no existe//
import { validarForm } from './funciones.js';

//agarro los formularios que pueden llegar a haber en la pàgina, en este caso son 2. user y pres.//
let miForm = document.getElementsByTagName('form');

console.log(miForm);//esto es un array, una collecion de elementos html//

let _formulario = miForm[0];

console.log(_formulario);

//reseteo el formulario(campos) cada vez de cargar la pàgina de 0//
_formulario.reset();

//al obtener el evento onsubmit, llamo a la funcion importada de otro archivo//
_formulario.onsubmit = validarForm;

console.log("js inicial cargado.");


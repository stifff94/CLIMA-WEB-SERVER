//se hace el llamado a la libreria axios que no dara datos de la ciudad paracada
const axios = require('axios');
//se crea la funcion para enviar el nombre de la ciudad a traves rapidapi para encontrar la localizacion de la ciudad
const getCiudadLatLon = async(nombre) => {

    const ciudad = encodeURI(nombre);
    //se crea la funcion a traves de la url donda por el servicio rapidapi
    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`,
        headers: { 'X-RapidAPI-Key': '8ac05538ebmsh1d8d2bb9ae49d50p1737a9jsn3064fa337c89' }
    });

    const resp = await instance.get();

    if (resp.data.Results.length === 0) {
        throw new Error(`No existe resultados para ${nombre}`);
    }
    //de los resultados obtenidos elejimos los que necesitamos para obtnere el clima que son las coordenadas de la ciudad
    const data = resp.data.Results[0];
    const name = data.name;
    const lat = data.lat;
    const lon = data.lon;
    // se retorna estos valores
    return {
        name,
        lat,
        lon
    }

    // instance.get()
    //     .then(resp => {
    //         console.log(resp.data.Results[0]);
    //     }).catch(err => {
    //         console.log("ERROR:", err);
    //     });

}
// se exporta la funcion
module.exports = {
    getCiudadLatLon
}
const axios = require('axios');

const getCiudadLatLon = async(nombre,nombre2) => {

    const ciudad = encodeURI(nombre);
    const ciudad2 = encodeURI(nombre2);

    const instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`,
        headers: { 'X-RapidAPI-Key': '8ac05538ebmsh1d8d2bb9ae49d50p1737a9jsn3064fa337c89' }
    });
    const instance2 = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad2}`,
        headers: { 'X-RapidAPI-Key': '8ac05538ebmsh1d8d2bb9ae49d50p1737a9jsn3064fa337c89' }
    });
    const resp = await instance.get();
    const resp2 = await instance2.get();
    if (resp.data.Results.length === 0) {
        throw new Error(`No existe resultados para ${nombre}`);
    }
    if (resp2.data.Results.length === 0) {
        throw new Error(`No existe resultados para ${nombre2}`);
    }
    const data = resp.data.Results[0];
    const name = data.name;
    const lat = data.lat;
    const lon = data.lon;
    const data2 = resp2.data.Results[0];
    const name2 = data2.name;
    const lat2 = data2.lat;
    const lon2 = data2.lon;
    return {
        name,
        lat,
        lon,
        name2,
        lat2,
        lon2
    }

    // instance.get()
    //     .then(resp => {
    //         console.log(resp.data.Results[0]);
    //     }).catch(err => {
    //         console.log("ERROR:", err);
    //     });

}

module.exports = {
    getCiudadLatLon
}
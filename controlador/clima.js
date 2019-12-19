const axios = require('axios');

const getClima = async(lat, lon, lat2, lon2) => {
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ac7eaef281e24b3e15ae43d9c6ee567d&units=metric`);
    const resp2 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat2}&lon=${lon2}&appid=ac7eaef281e24b3e15ae43d9c6ee567d&units=metric`);
    console.log("resp2",resp2)
    return [resp.data.main.temp,resp2.data.main.temp];
}
module.exports = {
    getClima
}
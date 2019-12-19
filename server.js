const express = require('express');
const app = express();
const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

const hbs = require('hbs');
require('./hbs/helpers');

const getInfo = async(ciudad) => {
    console.log("llego")
    try {
        const coords = await ubicacion.getCiudadLatLon(ciudad);
        const temp = await clima.getClima(coords.lat, coords.lon);
        return temp;
    } catch (e) {
        return `Fallo: tiempo de espera acabado`;
    }
}

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    getInfo("Quito").then(archivo =>{
        if(archivo.length > 2){
            getInfo("Guayaquil").then(archivo2 =>{
            res.render('home', {    
                datos1: archivo,
                datos2: archivo2,
            }); })   
        }
        else{
            res.render('home', {    
                datos1: archivo[0],
                datos2: archivo[1],
            });
        }
        
        
    }).catch(error =>{
        res.render('home', {    
            datos1: error,
        });
    });
    
    
});

app.get('/about', function(req, res) {
    
    getInfo("Madrid").then(archivo =>{
        if(archivo.length > 2){
            getInfo("Paris").then(archivo2 =>{
            res.render('home', {    
                datos1: archivo,
                datos2: archivo2,
            }); })   
        }
        else{
            res.render('home', {    
                datos1: archivo[0],
                datos2: archivo[1],
            });
        } 
    }).catch(error =>{
        res.render('home', {    
            datos1: error,
        });
    });
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});
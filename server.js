// este es el modulo principa
//en el se creara el servidor web y se relacionara con las demas aplicaciones
//para medir el clima y la ubicacion de la ciudad
const express = require('express');
const app = express();
const axios = require('axios');

const ubicacion = require('./controlador/ubicacion');
const clima = require('./controlador/clima');

const hbs = require('hbs');
require('./hbs/helpers');
// funcion para obtener la informacion de la ciudad y que a su vez retorne el clima de esa ciudad
const getInfo = async(ciudad,ciudad2) => {
    console.log("llego")
    try {
        const coords = await ubicacion.getCiudadLatLon(ciudad);
        console.log(coords)
        const temp = await clima.getClima(coords.lat, coords.lon);
        console.log("temp",temp)
        return [temp,temp];
    } catch (e) {
        return `Fallo: tiempo de espera acabado`;
    }
}
// se inicializa el puerto para el servidor
const port = process.env.PORT || 3000;
// se inicializa el puerto para peticiones publicas
app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');
// llamado para el hbs raiz en el que se rendizara el html home
app.get('/', function(req, res) {
    getInfo("Quito","Guayaquil").then(archivo =>{
        if(archivo.length > 2){
            // se crea inicializa las variables de los hbs con datos erroneos o no encontrados
            res.render('home', {    
                datos1: archivo,
                datos2: archivo,
            });
        }
        else{
            // se inicializa las variables con los datos correctos del clima
            console.log(archivo[0])
            en=parseFloat(archivo[0])+6.08
            total = en.toFixed(2);
            total = parseFloat(total);
            res.render('home', { 
                datos1: archivo[0],
                datos2: total,
            });
        }
        
        
    }).catch(error =>{
        res.render('home', {    
            datos1: error,
        });
    });
    
    
});
// se inicializa el hbs about para el html about 
//el llamado es el mismo y las funciones son las mismas para el hbs home
app.get('/about', function(req, res) {
    
    getInfo("Madrid","Paris").then(archivo =>{
        if(archivo.length > 2){
            res.render('about', {    
                datos1: archivo,
                datos2: archivo,
            });
        }
        else{
            console.log(archivo[0])
            en=parseFloat(archivo[0])+1.92
            total = en.toFixed(2);
            total = parseFloat(total);
            res.render('about', { 
                datos1: archivo[0],
                datos2: total,
            });
        }
        
    }).catch(error =>{
        res.render('about', {    
            datos1: error,
        });
    });
});
// se inicializa el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});
//Exportaciones 
const express = require('express');
const cors = require('cors');
const router = require('../routes/usuarios');


class Server {

    constructor() {
        //atributos
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        //middlewares
        this.middlewares();

        //metodos, rutas de aplicación
        this.routes();
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Tratamiento del request body como json
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, router);
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Estamos corriendo en el puerto ${this.port}`)
        })
    }
}


module.exports = Server;
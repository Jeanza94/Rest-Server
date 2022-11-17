//Importaciones de terceros
const express = require('express');
const cors = require('cors');

//Importaciones del codigo
const router = require('../routes/usuarios');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        //atributos
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //metodos, rutas de aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
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
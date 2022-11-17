
const { request, response } = require('express');
const { compareSync } = require('bcryptjs');
const Usuario = require('../models/usuario');
const generarJWT = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Este correo no existe'
            })
        }

        //si sigue activo en la base de datos
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Este Usuario no esta activo, hable con el administrador'
            })
        }

        // Verificar la contraseña
        const verificacionContraseña = compareSync(password, usuario.password);
        if (!verificacionContraseña) {
            return res.status(400).json({
                msg: 'La contraseña no es valida'
            })
        }

        // Generar el jwt
        const token = await generarJWT(usuario.id);
        return res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salio mal, hable con el administrador'
        })
    }

}


module.exports = {
    login
}
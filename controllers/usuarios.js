const { request, response, } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(desde)
    //     .limit(limite);

    // const total = await Usuario.countDocuments({ estado: true })

    const [usuarios, total] = await Promise.all([
        Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite),
        Usuario.countDocuments({ estado: true })
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    //encryptar la constraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en base de datos
    await usuario.save();

    res.json(usuario);
}

const usuariosPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //todo validar contra base de datos
    if (password) {
        const salt = bcryptjs.genSaltSync();

        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;
    res.json({ usuario, usuarioAutenticado });
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'Patch api - controlador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
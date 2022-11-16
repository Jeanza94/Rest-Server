const { request, response, } = require('express')

const usuariosGet = (req = request, res = response) => {

    const querys = req.query;
    console.log({ querys })
    res.json({
        msg: 'get api - controlador'
    });
}

const usuariosPost = (req = request, res = response) => {
    const body = req.body;
    res.json(body);
}

const usuariosPut = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put api - controlador',
        id
    });
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        msg: 'delete api - controlador'
    });
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
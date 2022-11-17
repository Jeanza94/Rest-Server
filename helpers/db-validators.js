const Role = require('../models/rol');
const Usuario = require('../models/usuario')

const esRoleValido = async (rol = '') => {

    const existeRol = await Role.findOne({ rol });

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });

    if (existeEmail) {
        throw new Error('El correo ya existe');
    }
}

const existeUsuarioPorId = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El id: ${id} no existe en la base de datos`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
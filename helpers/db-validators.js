
const Role = require('../models/rol');
const { Usuario, Categoria, Producto } = require('../models');

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

const existeCategoria = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe en la base de datos`)
    }
}

const existeCategoriaNombre = async (nombre = '') => {
    const existeCategoria = await Categoria.findOne({ nombre: nombre.toUpperCase() });
    if (!existeCategoria) {
        throw new Error(`Esta categoria ${nombre} no existe en la base de datos`)
    }
}

const productoExiste = async (nombre = '') => {
    const producto = await Producto.findOne({ nombre });
    if (producto) {
        throw new Error('El producto ya existe');
    }
}

const productoExistePorId = async (id = '') => {
    const producto = await Producto.findById(id);
    if (!producto) {
        throw new Error('Este producto no esta en la base de datos');
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    productoExiste,
    existeCategoriaNombre,
    productoExistePorId

}
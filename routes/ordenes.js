
const { Router } = require('express');


const { ordenesGetByUid, ordenesPost, ordenesGet } = require('../controllers/ordenes');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-roles')
const { validarOrdenes } = require('../middlewares/validar-ordenes');

const router = Router();

router.get('/todas', [
    validarJWT,
    esAdminRole,
], ordenesGet)

router.get('/lista', [
    validarJWT,
], ordenesGetByUid)

router.post('/', [
    validarJWT,
    validarOrdenes,
], ordenesPost)



module.exports = router;
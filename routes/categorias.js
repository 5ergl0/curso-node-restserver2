const {Router}=require('express')
const {body,param}=require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const {
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria}=require('../controllers/categorias')
const { existeCategoriaPorId } = require('../helpers/db-validators')



const router=Router()



//Obtener todas las categorias - publico 
router.get('/',obtenerCategorias)


//Obtener una categoria por id - publico 
router.get('/:id',[
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
],obtenerCategoria)

//Crear una nueva categoria - privado - cualquier persona con un token valido 
router.post('/',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria)


//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria)


//Borrar una categoria - Admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria)




module.exports=router
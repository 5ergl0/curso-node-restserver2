
const {Router}=require('express')
const {body,param}=require('express-validator')

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares')
const {
    crearProducto, 
    obtenerProductos, 
    obtenerProducto,
    actualizarProducto,
    borrarProducto}=require('../controllers/productos')
const { existeProductoPorId,existeCategoriaPorId } = require('../helpers/db-validators')



const router=Router()


//Obtener todas las categorias - publico 
router.get('/',obtenerProductos)


//Obtener una categoria por id - publico 
router.get('/:id',[
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    validarCampos
],obtenerProducto)



//Crear una nueva categoria - privado - cualquier persona con un token valido 
router.post('/',[
    validarJWT,
    body('nombre','El nombre es obligatorio').not().isEmpty(),
    body('categoria','No es un id de Mongo').isMongoId(),
    body('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto)


//Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    //body('categoria','No es un id de Mongo').isMongoId(),
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    validarCampos
],actualizarProducto)


//Borrar una categoria - Admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    param('id','No es un ID de Mongo válido').isMongoId(),
    param('id').custom(existeProductoPorId),
    validarCampos
],borrarProducto)




module.exports=router


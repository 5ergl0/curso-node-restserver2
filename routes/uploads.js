
const {Router}=require('express')
const {body,param}=require('express-validator')



const { validarCampos,validarArchivoSubir } = require('../middlewares')
const {cargarArchivo, actualizarImagen, mostrarImagen,actualizarImagenCloudinary}=require('../controllers/uploads')
const {coleccionesPermitidas}=require('../helpers')


const router=Router()


router.post('/',validarArchivoSubir,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    param('id','El id debe de ser de monogo').isMongoId(),
    param('coleccion')
    .custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)  
//],actualizarImagen)

router.get('/:coleccion/:id',[
    param('id','El id debe de ser de monogo').isMongoId(),
    param('coleccion')
    .custom(c=>coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos

],mostrarImagen)

module.exports=router
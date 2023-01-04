//Esto solo debe contener las rutas y su protección 
const {Router}=require('express')
const {body,param}=require('express-validator')

/*
const{validarCampos}=require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')
const {esAdminRole,tieneRole}=require('../middlewares/validar-roles')
*/

const{
  validarCampos, 
  validarJWT, 
  esAdminRole, 
  tieneRole
}=require('../middlewares')

const{esRoleValido,emailExiste,existeUsuarioPorId}=require('../helpers/db-validators')


const {
  usuariosGet,
  usuariosPut, 
  usuariosPatch,
  usuariosPost,
  usuariosDelete } = require('../controllers/usuarios')

const router=Router()



validarInputsPost=[ 
  //Almacena los errores en la req  (express-validator)
  body('nombre', 'El nombre es obligatorio').not().isEmpty(),
  body('password','El password debe de ser más de 6 letras ').isLength({min:6}),
  body('correo','El correo no es valido').isEmail(),
  body('correo').custom(emailExiste),
  //body('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
  
  //El error es atrapado en el custom
   body('rol').custom(esRoleValido), //(('rol')=>esRoleValido(rol))

  validarCampos//Si pasa ejecuta el controlador
]

//Se usa param si son segmentos ':id' (si no se encuentra en el body)
validarInputsPut=[
  param('id','No es un ID válido').isMongoId(),
  param('id').custom(existeUsuarioPorId),
  body('rol').optional().custom(esRoleValido),
  validarCampos
]

//Los middlewares se ejecutan de manera secuencial 
validarInputsDelete=[
  validarJWT,
  //esAdminRole, //A fuerzas debe ser Administrador
  tieneRole('ADMIN_ROLE','VENTAS_ROLE','OTRO_ROLE'),//Enviar argumentos a un middleware 
  param('id','No es un ID válido').isMongoId(),
  param('id').custom(existeUsuarioPorId),
  validarCampos
]


//router sustitute a this.app (sirve para tenerlo en un archivo independiente)
//this.app.get('/api',  (req, res)=>{

router.get('/',usuariosGet)//Solo pasamos la referencia de la función (por eso no lleva parentesis)

//La ruta se hace didamica con ':' (es obligatorio un  segmeneto despues del ':')
router.put('/:id',validarInputsPut,usuariosPut)
/*Cualquier info despues del '/' se almacenara en un propiedad
del req con el nombre que le hayas puesto  */



/*Segundo argumento:Definir un middleware, si son muchos se manda un 
arreglo de middlewares (express-validator)*/
router.post('/',validarInputsPost,usuariosPost)

router.patch('/',usuariosPatch)

router.delete('/:id',validarInputsDelete,usuariosDelete)

  









module.exports=router
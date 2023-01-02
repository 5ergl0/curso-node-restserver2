//Esto solo debe contener las rutas y su protección 
const {Router}=require('express')
const {
  usuariosGet,
  usuariosPut, 
  usuariosPatch,
  usuariosPost,
  usuariosDelete } = require('../controllers/usuarios')

const router=Router()



//router sustitute a this.app (sirve para tenerlo en un archivo independiente)
//this.app.get('/api',  (req, res)=>{

router.get('/',usuariosGet)//Solo pasamos la referencia de la función (por eso no lleva parentesis)

//La ruta se hace didamica con ':' (es oblogatorio un  segmeneto despues del ':')
router.put('/:id',usuariosPut)

router.post('/',usuariosPost)

router.patch('/',usuariosDelete)

router.delete('/',usuariosPatch)

  









module.exports=router
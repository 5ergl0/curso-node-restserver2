const {response, req}=require('express') //sirve para que funcione el typado de res
const bcryptjs=require('bcryptjs')

const Usuario=require('../models/usuario')



const usuariosGet=async(req, res=response)=>{

    //const query=req.query (Query=pregunta, toma en cuenta todo lo que va despues del '?' que esta en el url)
    
    const {limite=5,desde=0}=req.query
    const condicion={estado:true}


//Devuelve Primera promesa, Devuelve Segunda promesa
    const [total,usuarios]=await Promise.all([
        Usuario.countDocuments(condicion),
        Usuario.find(condicion)//Get de los usuarios
        .skip(Number(desde))//Empezar a mostrar paginación
        .limit(Number(limite))//Limitamos los elementos a mostrar

    ])
    
    res.json({
      total,
      usuarios
    })
}


const usuariosPost=async(req, res=response)=>{

    const {nombre,correo,password,rol}=req.body    //Obtener info del body


    /*Moongose solo tomara los valores del body que concuerden con 
    el modelo hecho (el Scheme)*/
    //Pasamos datos del body al modelo hecho en mongoose (El argumento debe ser un obj)
    const usuario=new Usuario({nombre,correo,password,rol}) //1)Creación de la Instancia (Creación colleción), Sera global Usuario


    //Encriptar la contraseña 

    /*El numero del salt es el numero de vueltas que quiren hacer
    para complicar la encriptación*/
    const salt=bcryptjs.genSaltSync(10)

    usuario.password=bcryptjs.hashSync(password,salt)//El hash es para incriptarlo en una sola via


    //Guardar en BD
    await usuario.save() //2)Grabar datos en la colección

    res.json({
        //mostrar info del body 
        msg:'post API',
        usuario
    })
  }

const usuariosPut=async(req, res=response)=>{

    //pedir segmentos de la ruta dinamica
    const {id}=req.params
        //Excluir con destructururación 
    const{_id,password,google,correo,...resto}=req.body

    //TODO validar contra base de datos
    if(password){
        //Encriptar contraseña
        const salt=bcryptjs.genSaltSync(10)
        resto.password=bcryptjs.hashSync(password,salt)
    }

    //                                          id,que quiero actualizar,(necessario a veces)
    const usuario=await Usuario.findByIdAndUpdate(id,resto,{new:true})

    res.json(usuario)
  }

const usuariosPatch=(req, res=responsse)=>{
    res.json({
        msg:'patch API'
    })
  }

const usuariosDelete=async(req, res=response)=>{

    const {id}=req.params

    //const uid=req.uid


    //Borrar fisicamente 
    //const usuario=await Usuario.findByIdAndDelete(id)

    //Cambiar estado 
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false})

    //Autenticar
    //const usuarioAutenticado=req.usuario


    
    res.json(usuario)


  }




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
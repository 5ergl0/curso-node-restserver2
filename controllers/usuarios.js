const {response}=require('express') //sirve para que funcione el typado de res



const usuariosGet=(req, res=response)=>{
    
    res.json({
        msg:'get API - controlador'
    })
}


const usuariosPost=(req, res=response)=>{
    const {body}=req

    res.json({
        msg:'post API',
        body
    })
  }

const usuariosPut=(req, res=response)=>{

    //pedir parametros de la ruta dinamica
    const {id}=req.params

    res.json({
        msg:'put API',
        id
    })
  }

const usuariosPatch=(req, res=response)=>{
    res.json({
        msg:'patch API'
    })
  }

const usuariosDelete=(req, res=response)=>{
    res.json({
        msg:'delete API'
    })
  }




module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
const {response, request}=require('express')
const jwt=require('jsonwebtoken')
const usuario = require('../models/usuario')


const Usuario=require('../models/usuario')

/*Esta req y res es la misma para todos los middlewares personalizado, no personalizados y controladores  (se pasa por referencia)
Por lo tanto podemos usar req t res en todas ellas */
const validarJWT=async (req=request,res=response,next)=>{

//                        nombre header
    const token =req.header('x-token')//Obtener info del header 

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        })
    }



    try {
        
        //                        token,    secretKey
        const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY)//Valida y lo desencripta


        //Leer el usuario que corresponde al uid
        const usuario= await Usuario.findById(uid)


        if (!usuario){
            return res.status(401).json({
                msg:'Token no válido - usuario no existe en DB'
            })
        }
    
        //Verificar si el uid tien estado en true 
        if(!usuario.estado){
            return res.status(401).json({
                msg:'Token no válido - usuario con estado: false'
            })
        }

        //req.usuario no exitia hasta ese momento, nosotros lo creamos 
        req.usuario=usuario


        next()
    } catch (error) {
        //Si no existe el token o esta manipulado caera aqui 
        console.log(error)
        res.status(401).json({
            msg:'Token no valido'
        })
        
    }

    
}

module.exports={
    validarJWT
}
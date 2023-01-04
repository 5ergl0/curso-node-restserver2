const { response } = require("express");
const bcryptjs=require("bcryptjs")


const Usuario=require('../models/usuario')

const {generarJWT}=require('../helpers/generar-jwt')


const login=async (req,res=response)=>{

    const {correo,password}=req.body 

    try {

        //Verificar si el email existe
        const usuario=await Usuario.findOne({correo})//Encuentra el documento que cumple la condición y te lo devuelve
        if (!usuario){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - correo'
            })
        }
            
        //Si el usuario está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado: false'
            })
        }

        //Verificar la contraseña
        //                          contraseñaIntroducida,contraseñaDB
        const validPassword=bcryptjs.compareSync(password,usuario.password)//Sirve para comparar las contraseñas y saber si coinciden (lo hace de manera  asincronica)
        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario / Passwor no son correctos - password'
            })
        }


        //Generar el JWT
        const token = await generarJWT(usuario.id)


        
        res.json({//Solo puedes tener un res.json en cada controlador
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg:'Hable con el administrador'
        })
        
    }




}



module.exports={
    login
}
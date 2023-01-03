//const { db } = require('../models/rol')
const Role=require('../models/rol')
const Usuario=require('../models/usuario')//Si necesitas el modelo del usuario debes importar el modelo obvio


//Buscar nombre de rol que sea igual a alguno de la DB

const esRoleValido=async(rol='')=>{//Validación customizada
    const existeRol=await Role.findOne({rol})
    if(!existeRol){
//Asi funciona el express-validator para lanzar un error personalizado
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}


const emailExiste=async(correo='')=>{

    //Verificar si el correo existe
    const existeEmail=await Usuario.findOne({correo})
    if (existeEmail){

        throw new Error(`El correo ${correo}, ya está registrado`)

        /*return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })*/
    }
}


const existeUsuarioPorId=async(id)=>{

    const existeUsuario=await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error(`El id ${id}, no existe`)
    }
}

module.exports={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}




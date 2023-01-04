//un middleware es una simple función

const { response } = require("express")

const esAdminRole=(req, res=response,next)=>{

    if(!req.usuario){
        return res.status(500).json({
            msg:'Se quiere verificar el role sin validar el token primero'
        })
    }


    const {rol,nombre}=req.usuario
    
    if(rol!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador -No puede hacer esto`
        })
    }

    next()
}

/*'...' si se usa en los argumentos se llama rest operator,
(que significa que quiero el resto de argumentos que vienen ahi)
si se usa en otro lado se lla spread operator.
Va a almacenar todos los argumentos que lleguen en un arreglo */
const tieneRole=(...roles)=>{
        return(req, res=response,next)=>{

            if(!req.usuario){
                return res.status(500).json({
                    msg:'Se quiere verificar el role sin validar el token primero'
                })
            }
            
            if(!roles.includes(req.usuario.rol)){
                return res.status(401).json({
                    msg:`El servicio requiere uno de estos roles ${roles}`
                })
            }
            
            next()
        }
}


module.exports={
    esAdminRole,
    tieneRole
}
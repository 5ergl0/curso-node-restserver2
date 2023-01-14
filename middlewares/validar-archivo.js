const { response } = require("express")

const validarArchivoSubir=(req,res=response,next)=>{

    //Si no viene ningun archivo||Si no viene ninguna propiedad||Si no viene el nombre del archivo
    if (!req.files || Object.keys(req.files).length === 0||(!req.files.archivo)) {
        return res.status(400).json({
            msg:'No hay arhivos que subir - validarArchivoSubir'
        });
    }

    next()

}


module.exports={

    validarArchivoSubir

}


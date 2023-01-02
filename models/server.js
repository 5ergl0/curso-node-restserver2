
const express = require('express')
const cors = require('cors')

class Server{

    constructor(){
        this.app=express()
        this.port=process.env.PORT||3000
        this.usuariosPath='/api/user'


        //Middlewares
        this.middlewares()

        //Rutas de mi aplicación
        this.routes()

        
    }

    middlewares(){

        //CORS
        this.app.use(cors())

        //Lectura y parseo del body 
        this.app.use(express.json())//Cualquier info del body de cualquier ruta la convertira en formato JSON

        //Directorio
        this.app.use(express.static('public'))
    }

    routes(){

    //middleware al cual le pasamos la rutas 
        //         Ruta pricipal(path)      rutas path,put,get,etc      
 
       this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto',this.port)
        })
    }

}



module.exports=Server

const path=require('path')

//Los ':' significa que los estamos renombrando a uuidv4
const { v4: uuidv4 } = require('uuid');


const subirArchivo=(files,extensionesValidas=['png','jpg','jpeg','gif'],carpeta='')=>{

    return new Promise((resolve,reject)=>{


   
        const {archivo} = files;



        const nombreCortado=archivo.name.split('.')
        const extension=nombreCortado[nombreCortado.length-1]


        //Validar la extension
        if(!extensionesValidas.includes(extension)){
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`)
        }


  
        const nombreTemp=uuidv4()+'.'+extension
        //_dirname path donde me encuentro 
        const uploadPath = path.join(__dirname , '../uploads/',carpeta, nombreTemp);//Path donde el archivo se va a subir
  
    
        archivo.mv(uploadPath,(err)=> {
            if (err){
            reject(err)
            }

            resolve(nombreTemp)
        });
    })

    
}





module.exports={
    subirArchivo
}

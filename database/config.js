
const mongoose=require('mongoose')

//Configuración de DB usando moongose


//Concectarse a la DB 

const dbConnection=async()=>{

    try {//Se pone en un try catch porque es un proceso no controlado

        await mongoose.connect(process.env.MONGODB_CNN,{//Conectarse a la DB
            //useNewUrlParser:true,
            //useUnifiedTopology:true,
            // useCreateIndex:true,
            //useFindAndModify: false   
        })

        console.log('Base de datos online :)')
        
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos')
    }

}


module.exports={
    dbConnection
}
const {Schema,model}=require('mongoose')



const CategoriaSchema= Schema({
   
    nombre:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{//Cuando no se cumpla algo de esto dara error
        type:Schema.Types.ObjectId, //Propiedad de otro Schema
        ref:'Usuario',//referencia para que sepa cual Schema
        required:true
    }
})


CategoriaSchema.methods.toJSON= function(){
    //Separamos del objeto la version y el password, todo lo demás quedara en la variable usuario
    const {__v,estado,...data} =this.toObject()
    return data
}





module.exports=model('Categoria',CategoriaSchema)
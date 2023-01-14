

const {Schema,model}=require('mongoose')



const ProductoSchema= Schema({
   
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
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripción:{type:String},
    disponible:{type:Boolean,default:true},
    img:{type:String},
})


ProductoSchema.methods.toJSON= function(){
    const {__v,estado,...data} =this.toObject()
    return data
}



module.exports=model('Producto',ProductoSchema)
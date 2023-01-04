
/*
{
    nombre:'asa',
    correo:'skndskjd@cdc.com',
    password:'dddd',
    img:'nideidn',
    rol:'xcknkd',
    estado:false,
    google:false
}
*/

//Hacer esquema necesario para la base datos (definimos el modelo de la colección)
const {Schema,model}=require('mongoose')//Destructuramos para no poner mongoose.shema/mongoose.model



const UsuarioSchema= Schema({
    nombre:{
        type:String,
        //Inidicamos si es requerido, Mensaje a mostrar si no lo pone 
        required:[true,'El nombre es obligatorio'] 
    },
    correo:{
        type:String,        //mensaje de error
        required:[true,'El correo es obligatorio'],
        unique:true //dato unico
    },
    password:{
        type:String,
        required:[true,'La contraseña es obligatorio'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required:true,

        //Validar una opción o otra
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    },
})

/*Una función de flecha mantiene a lo que apunta el this */

/*.methods: nos permite sobrescribir los metodos existentes de moongoose 
o crear metodos personalizados,

Cuando llamemos a esto metodo con este modelo funcionara así*/

UsuarioSchema.methods.toJSON= function(){
    //Separamos del objeto la version y el password, todo lo demás quedara en la variable usuario
    const {__v,password,_id,...usuario} =this.toObject()
    
    usuario.uid=_id//Cambiamos nombre de la llave 
    
    return usuario
}



//1er param: nombre del modelo y para la colección (moongose agregara una 's' al final)
//2ndo param:esquema 
module.exports=model('Usuario',UsuarioSchema)



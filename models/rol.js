

//Schema que nos servira para validar ls rols contra la base de datos

const {Schema,model}=require('mongoose')



const RoleSchema= Schema({
   
    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
})

/*Una función de flecha mantiene a lo que apunta el this */

/*UsuarioSchema.methods.toJSON= function(){
    const {__v,password,...usuario} =this.toObject()
    return usuario
*/

//1er param: nombre del modelo y para la colección (moongose agregara una 's' al final)
//2ndo param:esquema 
module.exports=model('Role',RoleSchema)
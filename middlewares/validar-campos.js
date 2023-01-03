//En la carpeta de middlewares se ponen middlewares personalizados

const {validationResult}=require('express-validator')


/*next:Es lo  que tengo que llamar si este middleware pasa
Llama a otro middleware o si ya no hay llama al controlador*/
const validarCampos=(req,res,next)=>{

       //Validación de campos
   const errors=validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json(errors)
   }

   next()//Tu ponlo (Es algo necesario del express-validator)

}



module.exports={
    validarCampos
}
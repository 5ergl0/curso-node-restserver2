
const { response } = require("express");
const { body } = require("express-validator");
const {Producto}=require ('../models')




//obtenerProductos - paginado - total - populate
const obtenerProductos=async(req,res=response)=>{

    const {limite=5,desde=0}=req.query
    const condicion={estado:true}

    const [total,productos]=await Promise.all([
        Producto.countDocuments(condicion),
        Producto.find(condicion)
    //              ref, que extraer (sirve para enlazar propiedades de diferrentes modelos )
        .populate('usuario','nombre')//Sirve para extraer propiedades de otro modelo a partir del id de otro modelo 
        .populate('categoria','nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        productos
    })
}


//obtenerProducto - populate {}

const obtenerProducto=async(req,res=response)=>{

    const {id}=req.params
    const producto= await Producto.findById(id)
                    .populate('usuario','nombre')
                    .populate('categoria','nombre')

    res.json(producto)
}




const crearProducto=async(req,res=response)=>{
    

    const {estado,usuario,...body}=req.body

    const productoDB=await Producto.findOne({nombre:body.nombre})

    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar 
    const data={
        ...body,
        nombre:body.nombre.toUpperCase(),
        usuario:req.usuario._id,
    }

    const producto=new Producto(data)

    //Guardar DB
    await producto.save()

    res.status(201).json({producto})

}



//actualizarProducto 
const actualizarProducto=async (req,res=response)=>{

    const {id}=req.params
    const {estado,usuario,...data}=req.body


    if(data.nombre){
        data.nombre=data.nombre.toUpperCase()
    }
    
    data.usuario=req.usuario._id

    //                                          id,que quiero actualizar(Objeto),(necessario a veces)
    const producto=await Producto.findByIdAndUpdate(id,data,{new:true})

    res.json(producto)
}


//borrarProducto - estado:false
const borrarProducto=async (req,res=response)=>{

    const {id}=req.params
    //Cambiar estado 
    const productoBorrado=await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

    res.json(productoBorrado)
}






module.exports={
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}
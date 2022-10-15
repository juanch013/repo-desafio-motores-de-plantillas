const express = require('express');
const router = express.Router();

const Contenedor = require('../objects/Contenedor.class');
let cont = new Contenedor("products.json");

router.get('/mostrarProductos',(req, res)=>{
    const prods = cont.getAll();
    res.render("mostrarProductos", {prods})
    // return res.status(200).json(prods);
})

// router.get('/:id',(req, res)=>{
//     const{id} = req.params
//     const prod = cont.getById(id)

//     if(prod == null){
//         return res.json({
//             ok:false,
//             msg:"no hay productos con ese id"
//         })
//     }

//     return res.status(200).json({
//         ok:true,
//         msg:'detalle de producto',
//         data: prod
//     });
// })

router.get('/productoRandom',(req, res)=>{
    const prods = cont.getRandomProd();
    return res.status(200).json(prods);
})

router.post('/',(req, res)=>{
    const{title, price, thumbnail} = req.body;

    if(!title || !price || !thumbnail){
        return res.json({
            ok:false,
            msg:"debe enviar el title , el price y el url de el thumnail del producto"
        })
    }

    let prod = cont.save({title:title,price:price,thumbnail:thumbnail});
    res.redirect('/productos')
    // return res.json({
    //     ok:true,
    //     data:prod
    // })


})

router.get("/agregarProductos", async (req, res)=>{
    const prods = await cont.getAll();
    res.render("agregarProductos", {prods})
})

router.delete('/:id',(req,res)=>{
    const{id} = req.params
    let prod = cont.getById(id);

    if(prod == null){
        return res.json({
            ok:false,
            msg:"no hay productos con ese id"
        })
    }

    cont.deleteById(id);
    
    return res.json({
        ok:true,
        msg:"producto borrado correctamente",
        data: prod
    })
})

router.put('/:id',(req,res)=>{
    const{id} = req.params
    const{title , thumbnail , price} = req.body
    if(!title && !price && !thumbnail){
        return res.json({
            ok:false,
            msg:"tiene que enviar por lo menos una propiedad para modificar"
        })
    }

    let prod = cont.getById(id);

    if(prod == null){
        return res.json({
            ok:false,
            msg:"no hay productos con ese id"
        })
    }

    cont.modify(id,req.body);
    
    return res.json({
        ok:true,
        msg:"producto modificado correctamente",
        data: prod
    })
})

module.exports = router
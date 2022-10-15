const Product = require('./objects/product.class');
const Contenedor = require('./objects/Contenedor.class');

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended : true}));

let cont = new Contenedor("products.json");

let productRoutes = require('./routes/productRoutes');
const { urlencoded } = require('express');



app.use('/productos',productRoutes);


app.use(express.static('public'))

app.listen(3000,()=>{
    console.log("server corriendo pa");
})

app.set("views", './views')

//Defino el motor para express
app.set("view engine", "ejs")

module.exports = cont;











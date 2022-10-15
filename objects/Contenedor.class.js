const fs = require('fs');
const { get } = require('http');
const Product = require('./product.class');

class Contenedor{
    //el parametro ruta es opcional y el valor por default es un string vacio
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo
    }

    save(product){

        const{title,price,thumbnail} = product;

        if(!title || !price || !thumbnail){
            console.log("El producto recibido tiene que tener titulo, thumbnail y precio como propiedades")
            return;
        }

        let products =[]
    
        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }

            if(products.length > 0){
            
                products = orderProducts(products);
    
                let newId = Number(products[products.length - 1].id) + 1;
    
                product= {
                    ...product,
                    id : newId
                }
    
                products.push(product);
    
                fs.writeFileSync(`./data/${this.archivo}`,JSON.stringify(products));
                return product;
    
            }

            let newProducts = [];
    
            let firstProduct = {
                ...product,
                id:1
            }
    
            newProducts.push(firstProduct);
    
            fs.writeFileSync(`./data/${this.archivo}`,JSON.stringify(newProducts));
            return firstProduct;

        } catch (error) {
            console.log("No se encontro el archivo")
            return;
        } 
    }

    getById(prodId){
        let products =[]

        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }

        } catch (error) {
            console.log("No se encontro el archivo get by id")
        }

        let prod = products.find((p)=>{
            return p.id == prodId; 
        })

        if(!prod){
            return null;
        }

        return prod
    }

    getAll(){
        let products =[]

        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }

        } catch (error) {
            console.log("No se encontro el archivo getall")
        }

        return products;
    }

    deleteById(prodId){
        let products =[]

        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }

            

            products = products.filter(p => p.id != prodId)

            fs.writeFileSync(`./data/${this.archivo}`,JSON.stringify(products));

        } catch (error) {
            console.log("No se encontro el archivo delete by id")
        }
    }

    deleteAll(){
        let products = []
        try {
            fs.writeFileSync(`./data/${this.archivo}`,JSON.stringify(products));
        } catch (error) {
            console.log("no se encontro el archivo deleteall");
        }
        
    }

    print(){

        let products =[]

        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }
            
            console.log(products);
        } catch (error) {
            console.log("No se encontro el archivo")
            return;
        }
    }

    getRandomProd(){
        let allProducts = this.getAll();

        let min = Math.ceil(0);
        let max = Math.floor(allProducts.length - 1);

        const randomIndex = Math.floor(Math.random() * (max - min) + min);

        return allProducts[randomIndex];
    }

    mod(id,prod){
        let products = [];
        const {title, price, thumbnail} = prod;
        try {
            products = fs.readFileSync(`./data/${this.archivo}`,'utf-8');

            if(products == ""){
                products = []
            }else{
                products = JSON.parse(products);
            }

            products = products.map((p)=>{
                if(p.id == id){
                    return {
                        id:p.id,
                        title: title == undefined? p.title: title,
                        price: price == undefined? p.price: price,
                        thumbnail: thumbnail == undefined? p.thumbnail: thumbnail
                    }
                }
            })

            fs.writeFileSync(`./data/${this.archivo}`,JSON.stringify(products));

        } catch (error) {
            console.log("No se encontro el archivo delete by id")
        }
    }
}

module.exports = Contenedor;


const orderProducts = (arr)=>{
    arr.sort((a,b)=>{
        return Number(a.id) - Number(b.id);
    });

    return arr;

}
const fs=require("fs");
let products=JSON.parse(fs.readFileSync("db.json",'utf-8')).users;
const index=fs.readFileSync("index.html","utf-8");
exports.create=(req,res)=>{
    const id=+req.params.id;
    products.push(req.body);
    res.send(products);
}
exports.delete=(req,res)=>{
    const id=+req.params.id;
    const index=products.findIndex(prd=>prd.id===id);
    if(index==-1){
        res.sendStatus(404);
    }
    else{
        const product=products[index];
        products.splice(index,1);
        res.json(products);
    }
}
exports.update=(req,res)=>{
    const id=+req.params.id;
    const body=req.body;
    const index=products.findIndex(prd=>prd.id===id);
    console.log(products);
    if(index==-1){
        res.status(404).send("Product not found");
    }
    else{
        const product=products[index];
        products.splice(index,1,{...product,...body});
        res.json(products);
    }
};
exports.overWrite=(req,res)=>{
    const id=+req.params.id;
    const body=req.body;
    const index=products.findIndex(prd=>prd.id===id);
    if(index===-1){
        res.status(404).send("element doesn't exists");
    }
    else{
        const product=products[index];
        products.splice(index,1,{...req.body,"id":id});
        res.json(products);
    }
};
exports.getAll=(req,res)=>{
    console.log(products);
    res.json(products);
};
exports.get=(req,res)=>{
    const id=+req.params.id;
    const index=products.findIndex(prd=>prd.id===id);
    if(index===-1){
        res.status(404).send("Product doesn't exits");
    }
    else{
        const product=products[index];
        res.json(product);
    }
}
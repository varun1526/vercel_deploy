const fs=require("fs");
const model=require("../model/product");
const mongoose=require("mongoose");
const product=model.schema;
const index=fs.readFileSync("index.html","utf-8");
exports.create=(req,res)=>{
    const id=+req.params.id;
    const p1=new product(req.body);
    p1.save();
    res.json(p1);
}
exports.delete = async (req,res)=>{
    const id=req.params.id;
    try{
        const delProduct=await product.findOneAndDelete({"_id":id},{new:true});
        if(delProduct==null){
            res.status(401).send("id doesn't exists");
        }
        else{
            res.status(200).json(delProduct);
        }
    }
    catch(err){
        res.status(404).send("Id doesn't exist");
    }
}
exports.update=(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    try{
        const p1=product.findOneAndUpdate({"_id":id},{body},{new:true});
        if(p1==null){
            res.status(402).send("id doesn't exists");
        }
        else{
            res.status(200).json(p1);
        }
    }
    catch(err){
        res.status(401).send("Id doesn't exists");
    }
};
exports.overWrite=(req,res)=>{
    const id=req.params.id;
    const body=req.body;
    try{
        const p1=product.findOneAndReplace({"_id":id},{body},{new:true});
        if(p1==null){
            res.status(401).send("id doesn't exists");
        }
        else{
            res.status(200).json(p1);
        }
    }
    catch(err){
        res.status(401).send("Id doesn't exists");
    }
};
exports.getAll=async (req,res)=>{
    const p1=await product.find();
    res.send(p1);
};
exports.get=async (req,res)=>{
    const id=req.params.id;
    const p1=await product.findOne({"_id":id});
    if(p1==null){
        res.status(401).send("Error in info");
    }
    else{
        res.json(p1);
    }
}
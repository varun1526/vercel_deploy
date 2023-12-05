const express=require("express");
const productController=require("../controller/products");
const router=express.Router();
router
.get("/",productController.getAll)
.get("/:id",productController.get)
.post("/:id",productController.create)
.put("/:id",productController.overWrite)
.patch("/:id",productController.update)
.delete("/:id",productController.delete);
exports.router=router;
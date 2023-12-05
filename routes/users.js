const express=require("express");
const router=express.Router();
const userController=require("../controller/users");
router
.get("/",userController.getAll)
.get("/:id",userController.get)
.post("/:id",userController.create)
.put("/:id",userController.overWrite)
.patch("/:id",userController.update)
.delete("/:id",userController.delete);
exports.router=router;
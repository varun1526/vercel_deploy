require('dotenv').config();
const express = require("express");
const mongoose=require("mongoose");
const productRouter=require("./routes/product").router;
const userRouter=require("./routes/users").router;
const cors=require("cors");
const app=express();
const path=require("path");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
  console.log("database connected");
}

app.use(cors());
app.use(express.static(process.env.PUBLIC_DIR))
app.use(express.json());
app.use("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,process.env.PUBLIC_DIR));
})
app.use("/",productRouter);
app.use("/users",userRouter);




app.listen(process.env.PORT,(req,res)=>{
    console.log("app listening on port number " + 27017);
});
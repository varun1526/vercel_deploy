const http=require("http");
const hostname="127.0.0.1";
const port=3000;
const fs=require("fs");
const data=JSON.parse(fs.readFileSync("db.json",'utf-8'));
let index=fs.readFileSync("index.html","utf-8");
const info=fs.readFileSync("info.html","utf-8");
const product=data.products;
const server=http.createServer((req,res)=>{
    const url=req.url;
    const id=null;
    const method=req.method;
    if(method=='GET'){
        if(url.startsWith("/products")){
            const ind=url.split("/")[2];
            res.setHeader("content-type","text/html");
            let product1=product.find(prd=>prd.id==ind.toString());
            let info2=info;
            info2=info2.replace("**title**",product1.title).replace("**price**",product1.price).replace("**url**",product1.images[0]).replace("**rating**",product1.rating);
            res.end(index.replace("**info**",info2));
            return;
        }
        switch(url){
            case "/":
                res.setHeader("content-type","text/html");
                res.end("Admin page");
                break;
            case "/products":
                res.setHeader("content-type","text/html");
                let allmethodProductData="";
                for(let i=0;i<product.length;i++){
                    let product1=product[i];
                    const info2=info.replace("**title**",product1.title).replace("**price**",product1.price).replace("**url**",product1.images[0]).replace("**rating**",product1.rating);
                    allProductData+=info2;
                }
                index=index.replace("**info**",allProductData);
                res.end(index);
                break;
            case "/api":
                res.setHeader("content-type","application/json");
                res.end(JSON.stringify(data));
                break;
            default:
                res.writeHead(400,"Error occurred",{"content-type":"text/plain"})
                res.end("Error occured");
        }
    }
    else if(method=='POST'){
        const body=req.body;
        console.log(body);
    }
})

server.listen(port,(err,res)=>{
    console.log(`url: http://localhost:3000`);
})
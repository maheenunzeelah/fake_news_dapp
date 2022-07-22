const express =require("express");
const users=require('./routes/api/users');
const publishers=require('./routes/api/publishers');

const app=express();
app.get('/',(req,res)=>{res.send("Hello")});
app.use('./api/publishers',publishers);
// app.use('./api/users',users);
const port=5000;
app.listen(port,()=>console.log(`Server running on port ${port}`));
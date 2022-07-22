const fs=require("fs");
const express=require("express");
const router=express.Router();
const jpickle = require('jpickle');
const binary = fs.readFileSync("pickle_model.pkl");

const unpickled = jpickle.loads(binary);
router.get('/publish',(req,res)=>res.json({msg:"published"}));
module.exports=router;
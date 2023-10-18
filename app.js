const path = require("path");
const express = require("express");
const BodyParser = require("body-parser");
const sequelize = require("./util/database");
const errorController = require("./controllers/error");
const User = require("./models/User");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post('/post', async(req,res,next)=>{

   try{
    if(!req.body.price){
        throw new Error("Price is Mandatory")
    }
    const price = req.body.price;
    const table = req.body.table;
    const menu = req.body.menu;
    const extra = req.body.extra;
    console.log(price)
    const data = await User.create({price: price, table:table, menu: menu, extra: extra})
    console.log(data);
    res.status(201).json({newUserDetail: data})
   }
   catch(err){
    console.log(err)
    res.status(500).json({
        error:err
    })
   }
})
app.get("/get",async(req,res,next)=>{
    try{
        const users = await User.findAll();
        res.status(200).json({allUsers:users});
    }
    catch(err){
        console.log("Get User is failing",JSON.stringify(obj));
        res.status(500).json({
            error:err
        })

    }
})
app.delete('/delete/:id', async(req,res,next)=>{
    try{
        const id = req.params.id;
        console.log(id)
        await User.destroy({
            where:{
                id:id
            }
        });
        res.status(200)
    }
    catch(err)
    {
        res.status(500).json({
            err:err
        })
    }
    
    
})
app.use("/",errorController.get404);

sequelize
.sync()
.then(result=>{
    app.listen(5000,(err)=>{
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("connectd to Port 5000")
        }
    });
})
.catch(err=>console.log(err));

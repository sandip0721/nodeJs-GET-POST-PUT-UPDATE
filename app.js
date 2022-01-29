const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./users");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const cors = require('cors');
mongoose.connect(
  "mongodb+srv://Sandip:sandip@cluster0.36ktn.mongodb.net/working?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//get method

app.get("/user", function (req, res) {
  User.find().then((data) => {
    res.status(201).json(data);
  });
});

//post method
app.post("/user",jsonParser,function (req, res) {
  const data = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  });
  data.save().then((result)=>{
      res.status(201).json(result);
  }).catch((error)=>console.log(error));
});

// delete method

app.delete('/user/:id', function(req,res){
    User.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json(result)
    }).catch((err)=>{console.log(err)})
})

// put method

app.put('/user/:id',jsonParser,function(req,res){
    User.updateOne({_id:req.params.id},
        {$set:{
            name:req.body.name,
            email:req.body.email,
            address:req.body.address
        }}
        ).then((result)=>{
            res.status(200).json(result)
        }).catch((err)=>{console.log(err)})
})

// option method

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//     next()
   
    app.options('option', (req, res) => {
     res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
    })
   
app.listen(4000);

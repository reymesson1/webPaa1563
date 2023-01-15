var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Category = require('../models/category.js');
var Counter = require('../models/counter.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getCategory = async(req,res)=>{

  let category = await Category.find({})

  res.send(category);
}

exports.setCategory = async(req,res)=>{

  var obj = req.body;

  var category = new Category({
    "id": obj.id,
    "description": obj.description,
    "image": obj.image,
    "notes": obj.notes
  })
  category.save(function(err){
    if(!err){
        console.log('Category saved');
    }
  })

  res.send(category);
}

exports.removeCategory = async(req,res)=>{

  var obj = req.body;

  var category = await Category.remove({"id":obj.id},function(err,master){
    if(!err){
      console.log("Category removed ");
    }
  })

  res.send(category);

}
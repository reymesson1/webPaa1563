var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Transaction = require('../models/transaction.js');
var Counter = require('../models/counter.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

exports.getTransaction = async(req,res)=>{

  let transaction = await Transaction.find({})

  res.send(transaction);
}

exports.setTransaction = async(req,res)=>{

  var obj = req.body;

  var transaction = new Transaction({
    "id": obj.id,
    "description": obj.description,
    "debit": obj.debit,
    "credit": obj.credit,
    "notes": obj.notes,
    "creator": obj.creator
  })

  transaction.save(function(err){
    if(!err){
        console.log('Transaction saved');
    }
  })

  res.send(transaction);
}
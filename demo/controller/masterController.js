var mongoose = require('mongoose');
var Master = require('../models/master.js');
var Counter = require('../models/counter.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var today = moment(new Date()).format('YYYY-MM-DD');

var Product = require('../models/product.js');

exports.getMaster = async(req,res)=>{

  var productBracelet = await Product.find({category:'Bracelet'},{_id:0, description:1, style:1, company:1,image:1, price:1, priceopt:1, category:1, notes:1, companystyle:1, hidden: 1, images:1});
  var imagesBracelet = []
  for(var x=0;x<productBracelet.length;x++){
    imagesBracelet.push({ "description":productBracelet[x].description,"style":productBracelet[x].style, "company":productBracelet[x].company,"name":productBracelet[x].image, "price":productBracelet[x].price, "priceopt":productBracelet[x].priceopt, "category":productBracelet[x].category, "notes":productBracelet[x].notes, "companystyle":productBracelet[x].companystyle,"hidden":productBracelet[x].hidden, "images":productBracelet[x].images } )
  }
  var productRings = await Product.find({category:'Rings'},{_id:0, description:1, style:1, company:1, image:1, price:1, priceopt:1, category:1, notes:1, companystyle:1,hidden:1, images:1});
  var imagesRings = []
  for(var x=0;x<productRings.length;x++){
    imagesRings.push({ "description":productRings[x].description,"style":productRings[x].style,"company":productRings[x].company,"name":productRings[x].image, "price": productRings[x].price, "priceopt": productRings[x].priceopt, "category": productRings[x].category, "notes": productRings[x].notes, "companystyle": productRings[x].companystyle, "hidden": productRings[x].hidden, "images": productRings[x].images  } )
  }
  var productNecklace = await Product.find({category:'Necklace'},{_id:0, description:1, style:1,company:1,image:1, price:1, priceopt:1,category:1, notes:1, companystyle:1, hidden:1, images:1});
  var imagesNecklace = []
  for(var x=0;x<productNecklace.length;x++){
    imagesNecklace.push({ "description": productNecklace[x].description, "company":productNecklace[x].company,"style":productNecklace[x].style,"name": productNecklace[x].image, "price": productNecklace[x].price, "priceopt": productNecklace[x].priceopt, "category": productNecklace[x].category, "notes": productNecklace[x].notes, "companystyle": productNecklace[x].companystyle, "hidden": productNecklace[x].hidden, "images": productNecklace[x].images } )
  }
  var productPendant = await Product.find({category:'Pendant'},{_id:0, description:1,style:1,company:1,image:1, price:1, priceopt:1,category:1,notes:1, companystyle:1, hidden:1, images:1});
  var imagesPendant = []
  for(var x=0;x<productPendant.length;x++){
    imagesPendant.push( { "description": productPendant[x].description, "company": productPendant[x].company,"style": productPendant[x].style,"name": productPendant[x].image, "price": productPendant[x].price, "priceopt": productPendant[x].priceopt, "category": productPendant[x].category, "notes": productPendant[x].notes, "companystyle": productPendant[x].companystyle, "hidden": productPendant[x].hidden, "images": productPendant[x].images } )
  }
  var productCrowns = await Product.find({category:'Crowns'},{_id:0, description:1,company:1,style:1, image:1, price:1, priceopt:1,category:1,notes:1, companystyle:1, hidden:1, images:1});
  var imagesCrowns = []
  for(var x=0;x<productCrowns.length;x++){
    imagesCrowns.push({ "description": productCrowns[x].description, "company": productCrowns[x].company,"style": productCrowns[x].style,"name": productCrowns[x].image, "price": productCrowns[x].price, "priceopt": productCrowns[x].priceopt, "category": productCrowns[x].category, "notes": productCrowns[x].notes, "companystyle": productCrowns[x].companystyle, "hidden": productCrowns[x].hidden, "images": productCrowns[x].images })
  }
  var productGems = await Product.find({category:'Gems'},{_id:0, description:1, company:1, style:1, image:1, price:1, priceopt:1, category:1, notes:1, companystyle:1, hidden:1, images:1});
  var imagesGems = []
  for(var x=0;x<productGems.length;x++){
    imagesGems.push({ "description": productGems[x].description, "company": productGems[x].company,"style": productGems[x].style,"name": productGems[x].image, "price": productGems[x].price, "priceopt": productGems[x].priceopt, "category": productGems[x].category, "notes": productGems[x].notes, "companystyle": productGems[x].companystyle, "hidden": productGems[x].hidden, "images": productGems[x].images })
  }


  var master = [
    {
    "categoryID": "1",
    "name": "eCatalog",
    "iconImageName": "circle.fill",
    "restaurants": [{
      "restaurantID": "M1",
      "name": "Bracelet",
      "imageName": "bracelets",
      "description": "List of Bracelet and accesories",
      "ratings": [],
      "images": imagesBracelet
    },{
      "restaurantID": "M2",
      "name": "Rings",
      "imageName": "rings",
      "description": "List of Rings and accesories",
      "ratings": [],
      "images": imagesRings
    },{
      "restaurantID": "M3",
      "name": "Necklace",
      "imageName": "necklace",
      "description": "List of Necklace and accesories",
      "ratings": [],
      "images": imagesNecklace
    },{
      "restaurantID": "M4",
      "name": "Pendant",
      "imageName": "pendant",
      "description": "List of Pendant and accesories",
      "ratings": [],
      "images": imagesPendant
    },{
      "restaurantID": "M5",
      "name": "Crowns",
      "imageName": "crowns",
      "description": "List of Crowns and accesories",
      "ratings": [],
      "images": imagesCrowns
    },{
      "restaurantID": "M6",
      "name": "Gems",
      "imageName": "gemstones",
      "description": "List of Gems and accesories",
      "ratings": [],
      "images": imagesGems
    }]
    }
  ];
  
  res.send(master);
}

exports.setMaster = async(req,res)=>{

  var newMaster = req.body;

  newMaster["telefono"] = req.body.item[0].telefono;
  
  var master = new Master(newMaster);
  
  master.save(function(err){
    if(!err){
      console.log('Master saved');
    }
  })
  
  master.push(req.body);
  
  res.send(req.body);
}

exports.removeMaster = async(req,res)=>{

  var master = await Master.remove({"id":req.body.id},function(err,master){
  if(!err){
    console.log("Master removed ");
  }
  })
  
  res.send('removed');
  }
exports.reportMaster = async(req,res)=>{

  var master = await Master.find({"date":today})

  res.send(master)
}
exports.MasterAPI = async(req,res)=>{
  
  var master = await Master.find({"date":today})
  
  res.send(master)
}
exports.updateDeliveryMaster = async(req,res)=>{
  
  var obj = req.body;
  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.fechaentrega = obj.fechaentrega + " "
    master.save(function(err,m){
      console.log("Master updated");
    })
  })
  
}
exports.paymentMaster = async(req,res)=>{
  var newPago = req.body

  var master = await Master.findOne({"id":newPago.id},function(err,master){
    master.balance = newPago.balance
    master.current = newPago.current
    master.pending = newPago.pending
    master.tipopago = newPago.tipopago
    master.status = "Pagado"
    master.save(function(err,m){
      console.log("Master Payment");
    })
  })
    
  res.send('end')
}
exports.maingetMaster = async(req,res)=>{

    var filteredTable = master.filter(
      (pending) => pending.status.indexOf('waiting') !== -1
  )

  res.send(filteredTable);
}
exports.mainsetMaster = async(req,res)=>{
  
  var id = req.body.id;
  
  var master = await Master.findOne({"id":id},function(err,master){
    if(master.status =="pending"){
      master.status = "waiting"
    }else{
      master.status = "done"
    }
    master.save(function(err,m){
      console.log("Main Master");
    })
  })
  
  res.send('exchanged');
  
}
exports.masterLoader = async(req,res)=>{

  var id = req.body.id;

   var master = await Master.findOne({"id":id})

  res.send(master);

}

exports.masterQuotation = async(req,res)=>{

  var id = req.body.id;
  
  var master = await Master.find({"id":id})
  
  res.send(master);
}

exports.getMasterCSV = async(req,res)=>{

  var master = await Master.find({})
  
  var arr = [];
  
  var second = [];
  
  for(var x=0;x<master.length;x++){
  
  second = []
  
  second.push("'"+master[x].id)
  second.push(master[x].date)
  second.push(master[x].name)
  second.push(master[x].project)
  second.push(master[x].agregado)
  second.push(master[x].desc)
  second.push(master[x].itbis)
  second.push(master[x].grandTotal)
  second.push(master[x].fechaentrega)
  second.push(master[x].horaentrega)
  second.push(master[x].balance)
  second.push(master[x].pending)
  second.push(master[x].current)
  second.push(master[x].tipopago)
  second.push(master[x].ncf)
  second.push(master[x].status)
  second.push(master[x].item)
  second.push(master[x].comments)
  
  arr.push(second)
  }
  
  res.send(arr);
}
exports.getMasterItemReport = async(req,res)=>{

  var master = await Master.aggregate([{"$match":{"date":{"$gte":today}}},{"$unwind":"$item"},{"$group":{"_id":"$item.development","total":{"$sum":"$item.quantity"}}}])

  res.send(master);
}
exports.getDashboardMaster = async(req,res)=>{
  
  var master = await Master.aggregate([{"$match":{"status":"Pagado"}},{"$group":{"_id":"$status","total":{"$sum":"$grandTotal"}}}])
  
  res.send(master);
}
      
exports.setMasterComment = async(req,res)=>{

  var obj = req.body;

  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.comments.push(obj.comment)
    master.save(function(err,m){
      console.log("Master updated");
    })
  })
  
}
exports.setMasterQuotation = async(req,res)=>{

  var obj = req.body;
  
  var master = await Master.findOne({"id":obj.id},function(err,master){
    master.status = "quoted"
    master.save(function(err,m){
      console.log("Master updated");
    })
  })

}

exports.setMasterCounter = async(req,res)=>{
  
     var id = mongoose.Types.ObjectId('5d287f5f6e795adb18ec651c');  
  
     var counter = await Counter.findOneAndUpdate(
      { "_id" : id},
      {
        $inc: {
          quantity:1
        }
      }
    ); 
  
    res.send(req.body)
}

exports.getMasterCounter = async(req,res)=>{
  
     var counter = await Counter.find(); 
  
     res.send(counter);  
}


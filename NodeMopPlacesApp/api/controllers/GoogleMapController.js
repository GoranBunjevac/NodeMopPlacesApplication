/**
 * GoogleMapController
 *
 * @description :: Server-side logic for managing Googlemaps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `GoogleMapController.create()`
   */
  
  //method for place create
  create: function (req, res) {
  var mongoose = require('mongoose');
  
  var GoogleMap = mongoose.model('GoogleMap');
  var googlemap = new GoogleMap({
       name: req.body.Name,
        description: req.body.Description,
        category: req.body.Category,
        long: req.body.Long,
        lati: req.body.Lati    
  });
  
  googlemap.save();
 
      
  },


  /**
   * `GoogleMapController.find()`
   */
  
  //method for food places search
  findFood: function (req, res) {
  var mongoose = require('mongoose');
  
  var GoogleMap = mongoose.model('GoogleMap');
  
  GoogleMap.find({category: "Food"},function(err, resu){
      res.send(resu);
  });
  
  },
  
  //method for clubs search
   findClubs: function (req, res) {
  var mongoose = require('mongoose');
  
  var GoogleMap = mongoose.model('GoogleMap');
  
  GoogleMap.find({category: "Clubs"},function(err, resu){
     res.send(resu);
  });
  
  },
  
  //method for bars search
  findBars: function (req, res) {
  var mongoose = require('mongoose');
  
  var GoogleMap = mongoose.model('GoogleMap');
  
  GoogleMap.find({category: "Bars"},function(err, resu){
      res.send(resu);
  });
  
  }
  
  
};


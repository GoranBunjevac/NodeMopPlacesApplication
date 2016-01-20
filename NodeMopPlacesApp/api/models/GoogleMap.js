    var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

//module.exports = {
    var Schema = mongoose.Schema;
var googleShema = new Schema({
name : String,
description : String,
category : String,
long : String,
lati : String
});

var GoogleMap = mongoose.model('GoogleMap', googleShema);

 
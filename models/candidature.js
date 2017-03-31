var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var candidatureSchema = new mongoose.Schema({
	evenement : { type: Schema.Types.ObjectId, ref: 'evenements' },
	figurant : { type: Schema.Types.ObjectId, ref: 'figurants' },
	etat : { type : String, default : "En attente" }
});

module.exports = mongoose.model('candidatures', candidatureSchema, 'candidatures');
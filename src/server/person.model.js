var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var personSchema = Schema({
    is_root: { type: Boolean, default: false },
    data: { name: { type: String }, node_open: { type: Boolean, default: false }, deletable: { type: Boolean, default: false } },
    parent: { type: ObjectId, ref: 'Person' },
    children: [{ type: ObjectId, ref: 'Person' }]
});

var Person = mongoose.model('Person', personSchema);

module.exports = Person;

const mongoose = require ('mongoose');
require ('mongoose-type-url')

const advertisementSchema = mongoose.Schema ({
    name : String,
    sale : Boolean,
    price : Number, 
    photo : mongoose.SchemaTypes.Url,
    tags : [String]
})

const Advertisement = mongoose.model ('Advertisement', advertisementSchema);

module.exports = Advertisement
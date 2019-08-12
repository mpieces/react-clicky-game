var mongoose=require("mongoose");
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    src:{
        type:String,
        trim:true
    },
    alt:{
        type: String,
        trim: true
    },
    id: {
        type: String,
        trim: true
    }
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
var mongoose=require("mongoose");
var transSchema=new mongoose.Schema(
{
   transid:String,
    amount:String
});

module.exports = mongoose.model("Trans",transSchema);
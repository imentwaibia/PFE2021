const mongoose =require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')
const schema = mongoose.Schema;

const jardinSchema = new schema({
    nom:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    description:{type:String,required:true},
    adresse:{type:String,required:true},
    logo:{type:String,required:true},
    nbr_employeur:{type:String,required:true},
    date_creation:{type:String,required:true},
    tel:{type:String,required:true,minlength:8},
    actif:{type:String,required:true},
    confirmation:{type:String,required:true},
    role: { type: String, default: "jardin" },
    parentDeligue:{type:mongoose.Types.ObjectId,ref:'parent'},
    enfants:[{type:mongoose.Types.ObjectId,required:true,ref:'enfant'}],
    parents:[{type:mongoose.Types.ObjectId,required:true,ref:'parent'}],
    activitys:[{type:mongoose.Types.ObjectId,required:true,ref:'activity'}],
    evenements:[{type:mongoose.Types.ObjectId,required:true,ref:'evenement'}],
    messages:[{type:mongoose.Types.ObjectId,required:true,ref:'message'}],
        

})

jardinSchema.plugin(uniqueValidator)

module.exports = mongoose.model('jardin',jardinSchema)
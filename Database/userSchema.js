const mongoose = require('mongoose');

const currentSchema = new mongoose.Schema({
    Name: {type:String, required:true},
    dob: {type:String,required: true},
    contact: {type:Number, required: true},
    gender:{type:String,required:true},
    email:{type:String, required: true,unique:true},
    state: {type:String, required: true},
    select: {type:String,required:true}
},
{
    collection:'data'
});

module.exports = mongoose.model('USER',currentSchema);

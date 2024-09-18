import mongoose  from "mongoose";

let imageschema = new mongoose.Schema({
    filename:String,
    filepath:String,
    uploadDate:{type:Date,default:Date.now}
})

export const filemodel= mongoose.model("imges",imageschema)
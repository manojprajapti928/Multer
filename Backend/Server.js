import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import path from 'path'
import mongoose from 'mongoose'
import { filemodel } from './model.js'
import "dotenv/config";


let app=express()
app.use(cors())
app.use(bodyParser.json())
app.use('/uploads',express.static('uploads'))

mongoose.connect(process.env.MONGODB_URI)
let port = process.env.PORT

let storage= multer.diskStorage({
    destination:function(req , file , cb){
        cb(null,'./uploads')
    },
    filename:function(req , file , cb){
        let ext = path.extname(file.originalname)
        cb(null,`${file.fieldname}-${Date.now()}-${ext}`)
    }
})

let upload = multer({storage:storage})

app.post('/api/post',upload.single('fileupload'),(req,res)=>{
  
    let newfile={
        filename:req.file.filename,
        filepath:req.file.path
    }

    let filepost = new filemodel(newfile)
    filepost.save()
    res.json("done")

})

app.get("/api/get",async(req,res)=>{
    let files = await filemodel.find()
    res.json(files)
})

app.listen(port,()=>{
    console.log("server is runnig 5700")
})

import mongoose from "mongoose";
import { Schema, model, Types } from "mongoose";
import { Locality } from "../Locality";


const PropertySchema = new Schema({
    title:{type:String , required:true, trim:true},
    slug:{type:String , required:true , unique:true},
    description:{type:String},
    price:{type:Number},
     address: { type: String, required: true },
  locality: { type: String, index: true },
  city: { type: String, required: true, index: true },
  images:[{type:String}],
  dealer:{type: Types.ObjectId, ref:"Dealers", required:true , index:true},
  status:{type:String , enum:["available", "sold", "offmarket"], default: 'available'},


  features:{
    type:Schema.Types.Mixed
  }  //flexible hjson for features



}, {timestamps:true})

PropertySchema.index({Locality:'text'})


export const Properties = mongoose.models.Properties || mongoose.model('Properties', PropertySchema);
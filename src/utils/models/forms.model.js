import { connectDb } from "../dbconnect";

const { default: mongoose } = require("mongoose");

await connectDb();
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  pinCode: Number,
  city: String,
  district: String,
  state: String,
  fType:String,

  active:{
    type:Boolean,
    default:true
  }
})

export const Form = mongoose.models?.Form || mongoose.model("Form", formSchema)
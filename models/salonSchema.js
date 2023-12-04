import mongoose from 'mongoose'

const salonSchema = new mongoose.Schema({
  Titulo:{
    type:String,
    required:true,
    unique:true,
    index:{unique:true}
  },
  Descripcion:{
    type:String,
    required:false
  },
  grado:{
    type:String,
    required:true
  },
  imagen:{
    type:String,
    required:false
  },
  grupo:{
    type:String,
    required:true,
    unique:true,
    index:{unique:true}
  }
})

export const Salon = mongoose.model('Salon',salonSchema);
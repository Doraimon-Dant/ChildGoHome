import mongoose from 'mongoose'

const domicilioSchema =new mongoose.Schema({
  calle:{
    type:String,
    required:true
  },
  colonia:{
    type:String,
    required:true
  },
  numero:{
    type:String,
    required:true
  },
  ciudad:{
    type:String,
    required:true
  },
  codigoPostal:{
    type:String,
    required:true
  },
  tutorId:{
    type:mongoose.Types.ObjectId,
    ref:'Tutor'
  }
  
})

export const Domicilio = mongoose.model('Domicilio',domicilioSchema);
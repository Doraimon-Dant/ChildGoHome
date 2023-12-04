import mongoose from 'mongoose'

const rolSchema = new mongoose.Schema({
  Rol:{
    type:String,
    required:true,
    unique:true,
    index:{unique:true}
  },
  Descripcion:{
    type:String,
    required:true
  }
})

export const Rol = mongoose.model('Rol',rolSchema);
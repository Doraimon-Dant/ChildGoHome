import mongoose from'mongoose'
import bcrypt from 'bcryptjs'
const maestroSchema = new mongoose.Schema({
  Nombre:{
    type:String,
    required:true,
  },
  userName:{
    type:String,
    required:true,
    unique:true,
    index:{unique:true}
  },
  psw:{
    type:String,
    required:true,
  },
  RolId:{
    type:mongoose.Types.ObjectId,
    ref:'Rol'
  }
},{
  methods:{
    async comparePassword(candidatePassword){
      return await bcrypt.compare(candidatePassword,this.password)
    }
  }
})
maestroSchema.pre('save',async function(next){
  const user = this
  if(!user.isModified("psw"))return next()

  try{
    const salt = await bcrypt.genSalt(10)
    user.psw = await bcrypt.hash(user.psw,salt)
    next()
  }catch(error){
    console.log(error)
    throw new Error("Error al codificar contraseña")
  }
})
maestroSchema.pre('updateOne',async function(next){
  const user = this
  try {
    const salt = await bcrypt.genSalt(10)
    user.psw = await bcrypt.hash(user.psw,salt)
    next()
  } catch (error) {
    console.log(error)
    throw new Error("Error al codificar contraseña ")
  }
})
maestroSchema.methods.comparePassword = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword,this.psw)
}
export const Maestro = mongoose.model('Maestro',maestroSchema);
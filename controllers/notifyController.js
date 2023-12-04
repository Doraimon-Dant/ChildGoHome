import { Salon } from "../models/salonSchema.js";
import { Tutor } from "../models/tutorSchema.js";
import { userErrors } from "../utils/errorHandler.js";
export const notify = async (req,res)=>{
    // Número de teléfono al que se enviará el mensaje (debe incluir el código del país)
    const{grupo}= req.params
    try {
      const salonId = await Salon.findOne({grupo})
      const tutores = await Tutor.find({}).where("salonId").equals(salonId.id).populate("TelefonoId")
      var mensaje = "Su hijo ha salido de clases";
      
      console.log(grupo,tutores)
      if(tutores.length==0)throw new Error("No Phones")
      tutores.forEach(tutor=>{
        let enlaceWhatsApp = `https://wa.me/${tutor['TelefonoId'].Telefono}?text=${encodeURIComponent(mensaje)}`
        res.redirect(enlaceWhatsApp)
      })
    } catch (error) {
      console.log(error)
      req.flash("Error",userErrors)
      
    }
}

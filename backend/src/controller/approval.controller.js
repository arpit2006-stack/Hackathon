import Nominee from "../models/register.model.js";


export const show = async(req,res,next)=>{

    const qpplication = await Nominee.find({registrationId}).select(
        
    )

}
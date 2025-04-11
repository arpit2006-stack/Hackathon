import ORG from '../models/orgcreate.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../lib/utils.js';


export const verifComitte = async(req,res,next)=>{
    const {name,password} = req.body;
    try{
        if(!name && !password){
            const error = new Error("THERE IS NO SUCH ORGANISATION");
            error.statuscode=403;
            return;
        }

        const org = await ORG.findOne({name});
        // const rightpassword = await ORG.findById(password);
        if(!org){
            const error = new Error("Not a valid name or password");
            error.statusCode = 404;
            next(error);
            return;
        }

        const rightpass = await bcrypt.compare(password , org.password)

        if (!rightpass) {
            const error = new Error("Invalid Email or Password");
            error.statusCode = 404;
            next(error);
            return;
          }

          generateToken(ORG._id,res);


          res.status(200).json({
            message: `Welcome Back ${ORG.name}`,
            email: ORG.email,
            // profilePic: user.profilePic,
          });

    }
    catch(error){
        next(error);
    }
}
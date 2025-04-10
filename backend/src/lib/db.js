import mongoose from 'mongoose'

export const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB connected ${conn.connection.host}`);
    }
    catch(error){
        console.log("Problem in mongo connection",error)
    }
}


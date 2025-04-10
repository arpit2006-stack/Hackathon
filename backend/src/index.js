import express from 'express';
import { connectDB } from './lib/db.js';
import orgRoutes from './routes/org.routes.js'
import bodyParser from 'body-parser'


const app = express();
app.use(express.json()); // Replace body-parser
app.use(express.urlencoded({ extended: true }));



app.use("/ ",orgRoutes);

app.get("/",(req,res)=>{
  res.json({message:"nsdfivnlafjvnafliv"})
})
app.use((err, req, res, next) => {
    console.log(err.stack);
  
    const StatusCode = err.statusCode || 500;
    res.status(StatusCode).json({ message: err.message });
  });


const PORT = process.env.PORT
 app.listen(PORT , ()=>{
    console.log(`Server connected at ${PORT} `);
    connectDB();
 })
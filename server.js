import  express  from "express";
import dotenv from 'dotenv';
import connectDB from './config/db.js'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());


app.get('/', (req,res) => {
  console.log("Api is running successfully")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Started at Port 5000"))
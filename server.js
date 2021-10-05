import  express  from "express";
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'
import shopRoutes from './routes/shopRoutes.js'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/shops', shopRoutes)


app.get('/', (req,res) => {
  res.send("Api is running successfully")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Started at Port 5000"))
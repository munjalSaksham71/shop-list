import  express  from "express";
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js'
import shopRoutes from './routes/shopRoutes.js'

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use('/api/shops', shopRoutes)


const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server Started at Port 5000"))
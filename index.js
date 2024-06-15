import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import AuthRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import MessageRoute from './routes/message.routes.js'
dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser())
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const PORT = process.env.PORT || 3000;
app.use("/",AuthRoutes)
app.use("/msg",MessageRoute)


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = 'realTimeApplication';

const uri = `mongodb+srv://sribabu:63037sribabu@atlascluster.k6u2oy9.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, options)
  .then(() => {
    console.log(`Connected to MongoDB database: ${dbName}`);

    // app.use("/message",messageRoutes)
    app.listen(PORT, () => {
      console.log(`Server running on port 3000 😅😂`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use("/api", (req, res) => {
  res.send("hello")
});






import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import http from 'http'; // Import http
import { Server } from 'socket.io'; // Import socket.io
import AuthRoutes from './routes/auth.routes.js';
import Auth2Routes from './routes/auth2.routes.js'
import cookieParser from 'cookie-parser';
import MessageRoute from './routes/message.routes.js';
import cors from 'cors';
import socketHandler from './sockets/socket.js'; // Import your socket handler

dotenv.config();
const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { // Initialize Socket.IO with the HTTP server
  cors: {
    origin: "*",
    methods: ["GET", "POST","PUT","Delete","PATCH"]
  }
});

app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const allowedOrigins = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const PORT = process.env.PORT || 3000;
app.use("/", AuthRoutes);
app.use("/main", Auth2Routes);
app.use("/msg", MessageRoute);

const options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
 };

const dbName = 'realTimeApplication';

const uri = `mongodb+srv://sribabu:63037sribabu@atlascluster.k6u2oy9.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, options)
  .then(() => {
    console.log(`Connected to MongoDB database: ${dbName}`);

    // Integrate socket handler
    socketHandler(io);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 😅😂`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use("/api", (req, res) => {
  res.send("hello");
});

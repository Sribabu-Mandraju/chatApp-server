import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const dbName = 'CHAT_APP';

const uri = `mongodb+srv://sribabu:63037sribabu@atlascluster.k6u2oy9.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(uri, options)
  .then(() => {
    console.log(`Connected to MongoDB database: ${dbName}`);

    // app.use("/message",messageRoutes)
    app.listen(3000, () => {
      console.log(`Server running on port 3000 😅😂`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use("/api", (req, res) => {
  res.send("hello")
});



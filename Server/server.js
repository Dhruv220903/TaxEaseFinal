import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import apiRoutes from './route/routes.js';

const app=express();
dotenv.config();

// Database Connection


const mongoURI = "mongodb+srv://sourabhpatil3617:WQ2HeTEmactCMdWG@cluster0.ibo6e.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// Enable CORS for all origins
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "token",
    keys: ["COOKIE_SECRET"], // Use a secure environment variable for this in production
    httpOnly: true
  })
);

// Serve static files
app.use("/uploads", express.static('uploads'));

// Routes

app.use("/api", apiRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});
// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

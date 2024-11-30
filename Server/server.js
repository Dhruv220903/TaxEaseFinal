import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import apiRoutes from './route/routes.js';

dotenv.config();
const app = express();

// Database Connection
const mongoURI = "mongodb://localhost:27017/taxease";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "token",
    keys: [process.env.COOKIE_SECRET || "default_secret"], // Secure in production
    httpOnly: true
  })
);

// Serve static files
app.use("/uploads", express.static('uploads'));

// Routes
app.use("/api", apiRoutes);

// Fallback Middleware to Set Headers for Errors
app.use((err, req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next(err); // Pass the error to the next error handler
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Internal Server Error" });
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
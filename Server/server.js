const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./route/routes');

dotenv.config();

// Database Connection
mongoose
  .connect(`mongodb+srv://sourabhpatil3617:WQ2HeTEmactCMdWG@cluster0.ibo6e.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => { })

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // React app's URL
  credentials: true
}));
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

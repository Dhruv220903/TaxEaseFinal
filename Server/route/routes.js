const express =  require("express")
const userRoutes =  require("./userRoutes.js")
const incomeRoutes =  require("./incomeRoutes.js")
const taxRoutes =  require("./taxRoutes.js");
const authRoutes = require("./auth.routes.js");

const apiRoutes = express.Router();

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/user", incomeRoutes);
apiRoutes.use("/user", taxRoutes);
apiRoutes.use("/auth", authRoutes);

module.exports=apiRoutes

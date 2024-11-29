import express from "express";
import userRoutes from "./userRoutes.js";
import incomeRoutes from "./incomeRoutes.js";
import taxRoutes from "./taxRoutes.js";
import authRoutes from "./auth.routes.js";

const apiRoutes = express.Router();

apiRoutes.use("/user", userRoutes);
apiRoutes.use("/user", incomeRoutes);
apiRoutes.use("/user", taxRoutes);
apiRoutes.use("/auth", authRoutes);

export default apiRoutes;


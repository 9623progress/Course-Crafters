import express from "express";
import dotenv from "dotenv";
import { connect } from "./utils/db.js";
import user from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import admin from "./routes/admin.routes.js";
import cors from "cors";
const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Allowed frontend URLs
  credentials: true, // Allow cookies and credentials
};
app.use(cors(corsOptions));
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/user", user);
app.use("/api/admin", admin);

const port = process.env.PORT;

app.listen(port, () => {
  connect();
  console.log(`app is listening on port: ${port}`);
});

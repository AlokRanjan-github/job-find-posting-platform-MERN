import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "../Backend/routes/company.route.js";

dotenv.config();
const app = express();

// Checking running of server
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to APIs",
        timestamp: new Date().toISOString(),
        success: true,
    });
});

// creating middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));

// API's
app.use("/api/user",userRoute);
app.use("/api/company",companyRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});

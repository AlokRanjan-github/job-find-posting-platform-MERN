import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
dotenv.config({});

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

const corsOption = {
  origin: ["http://localhost:5121"],
  credentials: true,
};

app.use(cors(corsOption));

// API's
app.use("/api/users",userRoute);
// http://localhost:5001/api/user/register
// http://localhost:5001/api/user/login
// http://localhost:5001/api/user/updateProfile

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

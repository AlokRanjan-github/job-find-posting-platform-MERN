import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

/*
Checking running of server
app.get("/",(req,res)=>{
    return res.status(200).json({
        message:"Welcome to APIs",
        timestamp: new Date().toISOString(),
        success: true,
    });
});
*/
// creating middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
  origin: ["http://localhost:5121"],
  credentials: true,
};

app.use(cors(corsOption));

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

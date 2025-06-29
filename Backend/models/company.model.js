import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    website:{
        type: String,
    },
    location: {
        type: String,
    },
    logo:{ // url for company logo
        type: String,
    },
    employees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

},{timestamps: true});

export const Company = mongoose.model("Company", companySchema);
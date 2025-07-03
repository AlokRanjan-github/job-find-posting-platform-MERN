import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    website:{
        type: String,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
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
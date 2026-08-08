import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            main: 1
        },
        category: {
            type: String,
            required: true,
            trim:true
        },
        available:{
            type: Boolean,
            default:true
        }
    },
    {timestamps:true}
);

export const ServiceModel = mongoose.model('services',serviceSchema);
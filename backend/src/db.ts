import mongoose from "mongoose";
import dotenv from "dotenv";
import { create } from "domain";

dotenv.config();

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/expensetracker")
.then(() =>{
    console.log("mongo db connected");
})
.catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 3, maxLength: 30 },
    password: { type: String, required: true, minLength: 6 },
    picture: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    createdAt: { type: Date, default: Date.now() }
});
const incomeSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String},
    date: {type: Date, default: create()},
    category: {type: String, required: true},
    createdAt: { type: Date, default: Date.now() }
});
const expenseSchema = new mongoose.Schema({
    user : {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    description: {type: String},
    date: {type: Date, default: create()},
    category: {type: String, required: true},
    createdAt: { type: Date, default: Date.now() }
});
export const User = mongoose.model("User", userSchema);
export const Income = mongoose.model("Income", incomeSchema);
export const Expense = mongoose.model("Expense", expenseSchema);

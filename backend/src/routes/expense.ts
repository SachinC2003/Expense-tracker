import express, {application} from "express"
import {Request, Response} from "express"
import { Expense } from "../db";

const expenseRouter = express.Router();

expenseRouter.post("/", async(req: Request, res: Response) =>{
    try{
        const {user, name, amount, description, category, date} = req.body;
        console.log(req.body);
        if(!user || !name || !amount || !category){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        }

        const exp = await Expense.create({user, name, amount, description, category, date})
        if(!exp){
            return res.status(500).json({success: false, message: "Failed to create expense"});
        }
        res.status(201).json({success: true, message: "Expense created successfully", data: exp});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

expenseRouter.get("/", async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January
    const currentYear = now.getFullYear();

    // Fetch expenses for current month
    const expenses = await Expense.find();
    console.log('Fetched expenses:', expenses);
    res.status(200).json({ success: true, expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

expenseRouter.get("/:year", async (req: Request, res: Response) => {
  try {
    const {year} = req.params;
    const yearNum = parseInt(year);

    // Fetch expense for the specified year
    const expense = await Expense.find({
      $expr: {
        $eq: [{ $year: "$date" }, yearNum]
      }
    });
    res.status(200).json({ success: true, expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

expenseRouter.put("/edit", async(req: Request, res: Response) =>{
    try{
        const {user, name, amount, description, category, date, id} = req.body;
        if(!user || !name || !amount || !category || !id){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        } 

        const exp = await Expense.findByIdAndUpdate(id, {user, name, amount, description, category, date}, {new: true});
        if(!exp){
            return res.status(500).json({success: false, message: "Failed to update income"});
        } 
        res.status(200).json({success: true, message: "Expense updated successfully", data: exp});
    }catch(err){  
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

expenseRouter.delete("/delete/:id", async(req: Request, res: Response) =>{
    try{
      const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        }
        const exp = await Expense.findByIdAndDelete(id);
        if(!exp){
            return res.status(500).json({success: false, message: "Failed to delete expense"});
        } 
        res.status(200).json({success: true, message: "Expense delete successfully", data: exp});
    }catch(err){  
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

module.exports = expenseRouter;
import express, {application} from "express"
import {Request, Response} from "express"
import { Expense } from "../db";

const expenserRouter = express.Router();

expenserRouter.post("/", async(req: Request, res: Response) =>{
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

expenserRouter.get("/", async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January
    const currentYear = now.getFullYear();

    // Fetch expenses for current month
    const expenses = await Expense.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, currentMonth + 1] }, // $month is 1-based
          { $eq: [{ $year: "$date" }, currentYear] }
        ]
      }
    });
    console.log('Fetched expenses:', expenses);
    res.status(200).json({ success: true, expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
   
module.exports = expenserRouter;
import express ,{ application } from "express"
import { Request, Response } from "express"
import { Income } from "../db";
const incomeRouter = express.Router();

incomeRouter.post("/", async(req: Request, res: Response) =>{
    try{
        const {user, name, amount, description, category, date} = req.body;
        console.log(req.body);
        if(!user || !name || !amount || !category){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        }

        const exp = await Income.create({user, name, amount, description, category, date})
        if(!exp){
            return res.status(500).json({success: false, message: "Failed to create income"});
        }
        res.status(201).json({success: true, message: "Income created successfully", data: exp});
    }catch(err){
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

incomeRouter.get("/", async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0 = January
    const currentYear = now.getFullYear();

    // Fetch income for current month
    const income = await Income.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$date" }, currentMonth + 1] }, // $month is 1-based
          { $eq: [{ $year: "$date" }, currentYear] }
        ]
      }
    });
    console.log('Fetched income:', income);
    res.status(200).json({ success: true, income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = incomeRouter;
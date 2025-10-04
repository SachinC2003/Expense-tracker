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
    res.status(200).json({ success: true, income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

incomeRouter.get("/:year", async (req: Request, res: Response) => {
  try {
    const {year} = req.params;
    const yearNum = parseInt(year);

    // Fetch income for the specified year
    const income = await Income.find({
      $expr: {
        $eq: [{ $year: "$date" }, yearNum]
      }
    });
    res.status(200).json({ success: true, income });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

incomeRouter.put("/edit", async(req: Request, res: Response) =>{
    try{
        const {user, name, amount, description, category, date, id} = req.body;
        if(!user || !name || !amount || !category || !id){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        } 

        const exp = await Income.findByIdAndUpdate(id, {user, name, amount, description, category, date}, {new: true});
        if(!exp){
            return res.status(500).json({success: false, message: "Failed to update income"});
        } 
        res.status(200).json({success: true, message: "Income updated successfully", data: exp});
    }catch(err){  
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});

incomeRouter.delete("/delete/:id", async(req: Request, res: Response) =>{
    try{
      const {id} = req.params;
        if(!id){
            return res.status(400).json({success: false, message: "Please provide all required fields"});
        }
        const inc = await Income.findByIdAndDelete(id);
        if(!inc){
            return res.status(500).json({success: false, message: "Failed to delete income"});
        } 
        res.status(200).json({success: true, message: "income delete successfully", data: inc});
    }catch(err){  
        console.error(err);
        res.status(500).json({success: false, message: "Server error"});
    }
});
module.exports = incomeRouter;
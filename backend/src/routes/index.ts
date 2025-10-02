import express ,{ application } from "express"
import { Request, Response } from "express"
const registerRouter = require("./register")
const expenserRouter = require("./expense")
const incomeRouter = require("./income")

const router = express.Router();
router.use("/register", registerRouter);
router.use("/expense", expenserRouter);
router.use("/income", incomeRouter);

router.get("/", (req: Request, res: Response) =>{
    res.send("Hello World from /api/v1");
})

module.exports = router;
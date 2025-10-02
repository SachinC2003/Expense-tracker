import express ,{ application } from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import { Request, Response } from "express"
const rootRouter = require("./routes/index")

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use("/api/v1", rootRouter);
app.get("/", (req: Request, res: Response) =>{
    res.send("Hello World");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
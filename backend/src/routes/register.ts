import express ,{ application } from "express"
import { Request, Response } from "express"
import { OAuth2Client } from "google-auth-library";
import { googleAuthController } from "../controllers/userController";

const registerRouter = express.Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
registerRouter.get("/", (req: Request, res: Response) =>{
    res.send("Hello World from /api/v1");
})

registerRouter.post("/auth", async(req: Request, res: Response) =>{
    try {
        const { token } = req.body; // frontend sends credential here

        const ticket = await client.verifyIdToken({
        idToken: token,
        audience: "593417087275-if2hvfr86idse6dbl87a49floa0qpi5t.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        if (!payload) return res.status(401).json({ error: "Invalid token" });

        // You get user info here
        const user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        };

        // Pass payload to controller
        req.body.payload = payload;
        await googleAuthController(req, res);
    } catch (error) {
        console.error("Google auth error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
});

module.exports = registerRouter;
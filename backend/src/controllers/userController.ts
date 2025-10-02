import { Request, Response } from "express";
import { findOrCreateUser } from "../services/userService"

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    const { payload } = req.body; // token already verified in router

    if (!payload) return res.status(400).json({ error: "Invalid payload" });

    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };

    // Service function → checks if user exists or creates new one
    const savedUser = await findOrCreateUser(user);

    return res.status(200).json({ user: savedUser });
  } catch (error) {
    console.error("Google Auth Controller Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};

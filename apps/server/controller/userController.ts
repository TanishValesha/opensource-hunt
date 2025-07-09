import { Request, Response } from "express";

export const getUserDetails = async (req: Request,
  res: Response): Promise<void> => {
    try {
      const {token} = req.body
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`
        }
      })

      const profile = await response.json();
      res.status(200).json({message: "User Found", data: profile});
      return;
    } catch (error) {
      res.status(404).json({message: "User Not Found"});
    }
    
}
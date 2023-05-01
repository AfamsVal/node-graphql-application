import { RequestHandler } from "express";
import { UserService } from "../user/user.service";
import AuthService from "./auth.service";

const authMiddleware = (
  userService: UserService,
  authService: AuthService
): RequestHandler => {
  return async (req: any, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication failed!" });
    }
    const userId: any = await authService.verifyToken(token);
    if (!userId) {
      return res.status(401).json({ message: "Authentication failed!" });
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.userId = user.id;
    next();
  };
};

export default authMiddleware;

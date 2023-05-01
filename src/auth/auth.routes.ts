// import express from "express";
// import { UserService } from "../user/user.service";
// import { AuthService } from "./auth.service";
// import { authMiddleware } from "./auth.middleware";

// const authRouter = express.Router();

// const userService = new UserService();
// const authService = new AuthService();

// authRouter.post("/signup", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await userService.createUser(username, password);
//     const token = await authService.signToken(user.id);
//     return res.status(201).json({ token });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// authRouter.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await userService.authenticateUser(username, password);
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = await authService.signToken(user.id);
//     return res.status(200).json({ token });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// authRouter.get("/me", authMiddleware(userService, authService), async (req, res) => {
//   const userId = req.userId;
//   try {
//     const user = await userService.getUserById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json(user);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// export default authRouter;

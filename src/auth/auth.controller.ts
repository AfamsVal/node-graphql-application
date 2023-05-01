// import { Router } from "express";
// import UserService from "../user/user.service";
// import AuthService from "./auth.service";
// import authMiddleware from "./auth.middleware";

// const router = Router();

// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const userService = new UserService();
//   const authService = new AuthService();
//   try {
//     const user = await userService.authenticate(username, password);
//     if (!user) {
//       return res.status(401).json({ message: "Authentication failed!" });
//     }
//     const token = await authService.generateToken(user.id);
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get("/me", authMiddleware, async (req, res) => {
//   const userService = new UserService();
//   try {
//     const user = await userService.getUserById(req.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json({ user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// export default router;

import express from "express";
import * as UserController from "../controllers/user.controller";

const router = express.Router();

router.get("/", UserController.findAllUsers);
router.get("/:id", UserController.findUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;

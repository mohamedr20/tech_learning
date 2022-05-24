import express from "express";
import * as BookController from "../controllers/book.controller";

const router = express.Router();

router.get("/", BookController.search);
router.post("/", BookController.createBook);
router.get("/:id", BookController.getBook);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export default router;

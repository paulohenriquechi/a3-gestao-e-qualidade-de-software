import { Router } from "express";
import { BookService } from "./services/BookService.js";
import { BookController } from "./controllers/BookController.js";

const router = Router();
const bookService = new BookService();
const bookController = new BookController(bookService);

router.get("/", (req, res) => bookController.getAll(req, res));
router.post("/", (req, res) => bookController.create(req, res));
router.get("/:id", (req, res) => bookController.getById(req, res));
router.put("/:id", (req, res) => bookController.update(req, res));
router.delete("/:id", (req, res) => bookController.delete(req, res));

export { router as default };

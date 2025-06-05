import { Router } from "express";
import { BookService } from "./services/BookService.js";
import { BookController } from "./controllers/BookController.js";

const router = Router();
const bookService = new BookService();
const bookController = new BookController(bookService);

router.get("/books", (req, res) => bookController.getAll(req, res));
router.post("/books", (req, res) => bookController.create(req, res));
router.get("/books/:id", (req, res) => bookController.getById(req, res));
router.put("/books/:id", (req, res) => bookController.update(req, res));
router.delete("/books/:id", (req, res) => bookController.delete(req, res));

export { router as default };

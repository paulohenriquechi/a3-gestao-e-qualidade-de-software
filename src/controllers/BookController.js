import { BookDTO } from "../models/BookSchema.js";
import { getZodError } from "../utils/utils.js";
class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  async getAll(req, res) {
    try {
      const books = await this.bookService.getAll();

      res.status(200).json({
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    const { data, success, error } = BookDTO.safeParse(req.body);

    if (!success) {
      const errorMessage = getZodError(error.errors);

      return res.status(400).json({ error: errorMessage });
    }

    try {
      const book = await this.bookService.create(data);

      res.status(201).json({
        message: "Book created successfully",
        data: book,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Book ID is required" });
      }

      const book = await this.bookService.getById(id);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.status(200).json({
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Book ID is required" });
      }

      const { data, success, error } = BookDTO.safeParse(req.body);

      if (!success) {
        const errorMessage = getZodError(error.errors);

        return res.status(400).json({ error: errorMessage });
      }

      const book = await this.bookService.update(id, data);

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.status(200).json({
        message: "Book updated successfully",
        data: book,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Book ID is required" });
      }

      const result = await this.bookService.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.status(204).json({
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export { BookController };

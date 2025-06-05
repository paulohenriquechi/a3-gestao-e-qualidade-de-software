import { BookService } from '../services/BookService.js';
import { execSync } from 'child_process';
import fs from "fs";
import path from "path";

describe("BookService", () => {
    let bookService;

    function mockBook(overrides = {}) {
        return {
            title: "Test Book",
            author: "Test Author",
            finished: false,
            ...overrides
        }
    }

    beforeAll(() => {
        execSync("npx prisma migrate deploy", { stdio: "inherit" });
        bookService = new BookService();
    });

    it("should fetch all books", async () => {
        const books = await bookService.getAll();

        expect(Array.isArray(books)).toBe(true);
    });

    it("should create a new book", async () => {
        const newBook = mockBook()

        const createdBook = await bookService.create(newBook);

        expect(createdBook).toHaveProperty("id");
        expect(createdBook.title).toBe(newBook.title);
        expect(createdBook.author).toBe(newBook.author);
    });

    it("should fetch a book by ID", async () => {
        const newBook = await bookService.create(mockBook());

        const fetchedBook = await bookService.getById(newBook.id);

        expect(fetchedBook).toHaveProperty("id", newBook.id);
        expect(fetchedBook.title).toBe(newBook.title);
        expect(fetchedBook.author).toBe(newBook.author);
        expect(fetchedBook.finished).toBe(newBook.finished);
    });

    it("should update a book", async () => {
        const newBook = await bookService.create(mockBook());

        const updatedData = mockBook({
            title: "Updated Test Book",
            finished: true
        })

        const updatedBook = await bookService.update(newBook.id, updatedData);

        expect(updatedBook).toHaveProperty("id", newBook.id);
        expect(updatedBook.title).toBe(updatedData.title);
        expect(updatedBook.author).toBe(updatedData.author);
        expect(updatedBook.finished).toBe(updatedData.finished);
    });

    it("should delete a book", async () => {
        const newBook = await bookService.create(mockBook());

        const deletedBook = await bookService.delete(newBook.id);

        expect(deletedBook).toHaveProperty("id", newBook.id);
        expect(deletedBook.title).toBe(newBook.title);
        expect(deletedBook.author).toBe(newBook.author);
        expect(deletedBook.finished).toBe(newBook.finished);
    });
})
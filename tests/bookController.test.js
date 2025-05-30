import { getBookById } from "../src/services/bookService.js";

test("getBookById returns a book with correct ID", () => {
    const book = getBookById(1);
    expect(book).toBeDefined();
    expect(book.id).toBe(1);
});

test("getBookById returns undefined for non-existent ID", () => {
    const book = getBookById(999);
    expect(book).toBeUndefined();
});
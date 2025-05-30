import { books } from "../utils/data.js";
import { book } from "../models/book.js";

export function getAllBooks() {
    return books;
}

export function getBookById(id) {
    return books.find(book => book.id === Number(id));
}

export function createBook({ tittle, author, finished }) {
    const newBook = new book({
        id: books.length + 1,
        tittle,
        author,
        finished
    });
    books.push(newBook);
    return newBook;
}

export function updateBook(id, data) {
    const index = books.findIndex(book => book.id === Number(id));
    if (index === -1) return null;

    const oldBook = books[index];
    const updatedBook = new book({
        id: oldBook.id,
        tittle: data.tittle ?? oldBook.tittle,
        author: data.author ?? oldBook.author,
        finished: data.finished ?? oldBook.finished,
        createdAt: oldBook.createdAt,
    });

    books[index] = updateBook;
    return updatedBook;
}

export function deleteBook(id) {
    const index = books.findIndex(book => book.id === Number(id));
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
}

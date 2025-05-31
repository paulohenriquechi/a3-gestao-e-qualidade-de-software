import * as bookService from "../services/bookService.js";

export const getAll = (req, res) => {
    res.status(200).json(bookService.getAllBooks());
};

export const getById = (req, res) => {
    const book = bookService.getBookById(req.params.id);
    book ? res.status(200).json(book) : res.sendStatus(404);
};

export const create = (req, res) => {
    const book = bookService.createBook(req.body);
    res.status(201).json(book);
};

export const update = (req, res) => {
    const updatedBook = bookService.updateBook(req.params.id, req.body);
    updatedBook ? res.sendStatus(204) : res.sendStatus(404);
};

export const remove = (req, res) => {
    const deleted = bookService.deleteBook(req.params.id);
    deleted ? res.sendStatus(204) : res.sendStatus(404);
};
import { book } from "../models/book.js";

export const books = [
    new book({ id: 1, tittle: "The Pragmatic Programmer", author: "Andy Hunt / Dave Thomas", finished: true}),
    new book({ id: 2, tittle: "Clean Code", author: "Robert Cecil Martin", finished: true}),
    new book({ id: 3, tittle: "The Art of Computer Programming", author: "Donald Knuth", finished: false}),
    new book({ id: 4, tittle: "Head First Design Patterns", author: "Elisabeth Freeman / Kathy Sierra", finished: true}),
    new book({ id: 5, tittle: "JavaScript: The Good Parts", author: "Douglas Crockford", finished: false}),
    new book({ id: 6, tittle: "You Don't Know JS", author: "Kyle Simpson", finished: false}),
    new book({ id: 7, tittle: "The Metamorphosis", author: "Franz Kafka", finished: true}),
];
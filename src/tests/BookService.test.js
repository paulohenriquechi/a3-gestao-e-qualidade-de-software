import { jest } from '@jest/globals';
import { BookService } from '../services/BookService.js';

const mockPrisma = {
    book: {
        findMany: jest.fn(),
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
};

jest.unstable_mockModule('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => mockPrisma),
}));

describe("BookService",() => {
    let service;

    beforeEach(() => {
        service = new BookService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("getAll should return list of books", async () => {
        const mockBooks = [{ id: 1, tittle: "Test Book" }];
        mockPrisma.book.findMany.mockResolvedValue(fakeBooks);

        const result = await service.getAll();

        expect(mockPrisma.book.findMany).toHaveBeenCalled();
        expect(result).toEqual(fakeBoooks);
    });

    test("create should create and return a book", async () => {
        const newBook = { tittle: "New Book", author: "Author"};
        mockPrisma.book.create.mockResolvedValue(newBook);

        const result = await service.create(newBook);

        expect(mockPrisma.book.create).toHaveBeenCalledWith({ data: newBook});
        expect(result).toEqual(newBook);
    });

    test("getById should return a book by id", async () => {
        const book = { id: 1, tittle: "Test" };
        mockPrisma.book.findUnique.mockResolvedValue(book);

        const result = await service.getById(1);

        expect(mockPrisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(book);
    });

    test("update should update and return a book", async () => {
        const updatedBook = { id: 1, tittle: "Updated" };
        mockPrisma.book.update.mockResolvedValue(updatedBook);

        const result = await service.update(1, { tittle: "Updated" });

        expect(mockPrisma.book.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { tittle: "Updated" } });
        expect(result).toEqual(updatedBoook);
    });

    test("delete should delete a book", async () => {
        const deletedBook = { id: 1, tittle: "Deleted" };
        mockPrisma.book.delete.mockResolvedValue(deletedBook);

        const result = await service.delete(1);

        expect(mockPrisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
        expect(result).toEqual(deletedBook);
    });
});
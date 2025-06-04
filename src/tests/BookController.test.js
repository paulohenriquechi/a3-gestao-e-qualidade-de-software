import { jest } from "@jest/globals";
import { BookController } from "../controllers/BookController.js";

describe("BookController", () => {
    let res;

    function mockRes() {
        return {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
    }

    function mockReq(body = {}, params = {}) {
        return {
            body,
            params,
        };
    }

    beforeEach(() => {
        res = mockRes();
    });

    it("getAll - sucesso", async () => {
        const mockBooks = [
            {
                id: 1,
                title: "Book One",
                author: "Author A",
                finished: false,
                createdAt: new Date(),
            },
            {
                id: 2,
                title: "Book Two",
                author: "Author B",
                finished: true,
                createdAt: new Date(),
            },
        ];

        const bookService = {
            getAll: jest.fn().mockResolvedValue(mockBooks),
        };

        const bookController = new BookController(bookService);

        await bookController.getAll({}, res);

        expect(bookService.getAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Books retrieved successfully",
            data: mockBooks,
        });
    });

    it("getAll - falha no serviço", async () => {
        const bookService = {
            getAll: jest.fn().mockRejectedValue(new Error("Service error")),
        };

        const bookController = new BookController(bookService);

        await bookController.getAll({}, res);

        expect(bookService.getAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Service error",
        });
    });

    it("create - sucesso", async () => {
        const mockBook = {
            id: 1,
            title: "New Book",
            author: "New Author",
            finished: false,
            createdAt: new Date(),
        };

        const bookService = {
            create: jest.fn().mockResolvedValue(mockBook),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "New Book",
            author: "New Author",
            finished: false,
        });

        await bookController.create(req, res);

        expect(bookService.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: "Book created successfully",
            data: mockBook,
        });
    });

    it("create - falha de validação do titulo", async () => {
        const bookService = {
            create: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "",
            author: "New Author",
            finished: false,
        });

        await bookController.create(req, res);

        expect(bookService.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Title is required",
        });
    });

    it("create - falha de validação do autor", async () => {
        const bookService = {
            create: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "New Book",
            author: "",
            finished: false,
        });

        await bookController.create(req, res);

        expect(bookService.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Author is required",
        });
    });

    it("getById - sucesso", async () => {
        const mockBook = {
            id: 1,
            title: "Book One",
            author: "Author A",
            finished: false,
            createdAt: new Date(),
        }

        const bookService = {
            getById: jest.fn().mockResolvedValue(mockBook),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: 1 });

        await bookController.getById(req, res);
        
        expect(bookService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Book retrieved successfully",
            data: mockBook,
        });
    });

    it("getById - falha ao encontrar livro", async () => {
        const bookService = {
            getById: jest.fn().mockResolvedValue(null),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: 1 });

        await bookController.getById(req, res);

        expect(bookService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book not found",
        });
    });

    it("getById - falha de validação do id", async () => {
        const bookService = {
            getById: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: "" });

        await bookController.getById(req, res);
        expect(bookService.getById).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book ID is required",
        });
    });

    it("update - sucesso", async () => {
        const mockBook = {
            id: 1,
            title: "Updated Book",
            author: "Updated Author",
            finished: true,
            createdAt: new Date(),
        };

        const bookService = {
            update: jest.fn().mockResolvedValue(mockBook),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "Updated Book",
            author: "Updated Author",
            finished: true,
        }, { id: 1 });

        await bookController.update(req, res);

        expect(bookService.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Book updated successfully",
            data: mockBook,
        });
    });

    it("update - falha ao encontrar livro", async () => {
        const bookService = {
            update: jest.fn().mockResolvedValue(null),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "Updated Book",
            author: "Updated Author",
            finished: true,
        }, { id: 1 });

        await bookController.update(req, res);

        expect(bookService.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book not found",
        });
    });

    it("update - falha de validação do id", async () => {
        const bookService = {
            update: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "Updated Book",
            author: "Updated Author",
            finished: true,
        }, { id: "" });

        await bookController.update(req, res);

        expect(bookService.update).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book ID is required",
        });
    });

    it("update - falha de validação do titulo", async () => {
        const bookService = {
            update: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "",
            author: "Updated Author",
            finished: true,
        }, { id: 1 });

        await bookController.update(req, res);

        expect(bookService.update).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Title is required",
        });
    });

    it("update - falha de validação do autor", async () => {
        const bookService = {
            update: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({
            title: "Updated Book",
            author: "",
            finished: true,
        }, { id: 1 });

        await bookController.update(req, res);

        expect(bookService.update).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Author is required",
        });
    });

    it("delete - sucesso", async () => {
        const bookService = {
            delete: jest.fn().mockResolvedValue({ id: 1 }),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: 1 });

        await bookController.delete(req, res);

        expect(bookService.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });

    it("delete - falha ao encontrar livro", async () => {
        const bookService = {
            delete: jest.fn().mockResolvedValue(null),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: 1 });

        await bookController.delete(req, res);

        expect(bookService.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book not found",
        });
    });

    it("delete - falha de validação do id", async () => {
        const bookService = {
            delete: jest.fn(),
        };

        const bookController = new BookController(bookService);

        const req = mockReq({}, { id: "" });

        await bookController.delete(req, res);

        expect(bookService.delete).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            error: "Book ID is required",
        });
    });
});

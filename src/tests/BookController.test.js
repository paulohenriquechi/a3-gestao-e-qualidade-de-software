import { BookController } from "../src/controllers/BookController.js";

describe("BookController", () => {
    let controller;
    let mockService;

    beforeEach(() => {
        mockService = { 
            getAll: jest.fn(),
            create: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        };
        controller = new BookController(mockService);
    });

    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        res.sendStatus = jest.fn().mockReturnValue(res);
        return res;
    };

    test("getAll - sucess", async () => {
        const req = {};
        const res = mockResponse();
        const books = [{ id: 1, tittle: "Test" }];

        mockService.getAll.mockResolvedValue(books);

        await controller.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(books);
    });

    test("getAll - error", async () => {
        const req = {};
        const res = mockResponse();

        mockService.getAll.mockRejectedValue(new Error("fail"));

        await controller.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: "fail" });
    });

    test("getById - found", async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();
        const book = { id: 1, tittle: "Test" };

        mockService.getById.mockResolvedValue(book);

        await controller.getById(req, res);

        expect(mockService.getById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(book);
    });

    test("getById - not found", async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();

        mockService.getById.mockResolvedValue(null);

        await controller.getById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
    });

    test("create - sucess", async () => {
        const req = { body: { tittle: "New" } };
        const res = mockResponse();
        const book = { id: 1, tittle: "New" };

        mockService.create.mockResolvedValue(book);

        await controller.create(req, res);

        expect(mockService.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(book);
    });

    test("uptade - found", async () => {
        const req = { params: { id: 1 }, body: { tittle: "Updated" } };
        const res = mockResponse();
        const book = { id: 1, tittle: "Updated" };

        mockService.update.mockResolvedValue(book);

        await controller.update(req, res);

        expect(mockService.update).toHaveBeenCalledWith(1, req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(book);
    });

    test("update - not found", async () => {
        const req = { params: { id: 1 }, body: { tittle: "Updated" } };
        const res = mockResponse();

        mockService.update.mockResolvedValue(null);

        await controller.update(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
    });

    test("delte - success", async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();

        mockService.delete.mockResolvedValue(true);

        await controller.delete(req, res);

        expect(mockService.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalledWith();
    });

    test("delete - not found", async () => {
        const req = { params: { id: 1 } };
        const res = mockResponse();

        mockService.delete.mockResolvedValue(false);

        await controller.delete(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Book not found" });
    });
});
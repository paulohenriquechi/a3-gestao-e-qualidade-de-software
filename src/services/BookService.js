import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BookService {
  async getAll() {
    try {
      return await prisma.book.findMany();
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  }

  async create(data) {
    try {
      return await prisma.book.create({ data });
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      return await prisma.book.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await prisma.book.update({
        where: { id: Number(id) },
        data,
      });
    } catch (error) {
      console.error(`Error updating book with ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id) {
    try {
      return await prisma.book.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error(`Error deleting book with ID ${id}:`, error);
      throw error;
    }
  }
}

export { BookService };

export default {
  testEnvironment: "node",
  roots: ["<rootDir>/src/tests"],
  transform: {},
};

process.env.DATABASE_URL = "file:./test.db";

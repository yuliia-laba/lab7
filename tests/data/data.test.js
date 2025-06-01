const axios = require("axios");

const BASE_URL = "https://demoqa.com/BookStore/v1";

describe("DemoQA Book Store API - Data Tests", () => {

  test("Get all books", async () => {
    const response = await axios.get(`${BASE_URL}/Books`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.books)).toBe(true);
    expect(response.data.books.length).toBeGreaterThan(0);
  });

  test("Check if book with specific ISBN exists", async () => {
    const isbn = "9781449331818";
    const response = await axios.get(`${BASE_URL}/Books`);
    const bookExists = response.data.books.some((book) => book.isbn === isbn);
    expect(bookExists).toBe(true);
  });

  test("Create a new user successfully", async () => {
    const uniqueUser = `testuser${Date.now()}`;
    const userData = { userName: uniqueUser, password: "Test@1234" };
    const response = await axios.post(
      "https://demoqa.com/Account/v1/User",
      userData
    );
    expect(response.status).toBe(201);
    expect(response.data.username).toBe(uniqueUser);
    expect(response.data.userID).toBeDefined();
  });

  test("Fail to create user with existing username", async () => {
    const userData = { userName: "testuser123", password: "Test@1234" };
    try {
      await axios.post("https://demoqa.com/Account/v1/User", userData);
    } catch (error) {
      expect([400, 406]).toContain(error.response.status);
    }
  });

  test("Generate authentication token for user", async () => {
    const loginData = {
      userName: "testuser123",
      password: "Test@1234",
    };
    const response = await axios.post(
      "https://demoqa.com/Account/v1/GenerateToken",
      loginData
    );
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    expect(typeof response.data.token).toBe("string");
    expect(response.data.expires).toBeDefined();
  });
});

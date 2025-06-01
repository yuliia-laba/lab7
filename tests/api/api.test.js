const axios = require("axios");

const BASE_URL = "https://demoqa.com/BookStore/v1";

describe("DemoQA Book Store API tests", () => {

  test("Get all books", async () => {
    const response = await axios.get(`${BASE_URL}/Books`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.books)).toBe(true);
  });

  test("Get all books and check if a specific ISBN exists", async () => {
    const expectedIsbn = "9781449331818";
    const response = await axios.get(`${BASE_URL}/Books`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data.books)).toBe(true);
    expect(response.data.books.length).toBeGreaterThan(0);

    const bookExists = response.data.books.some(
      (book) => book.isbn === expectedIsbn
    );
    expect(bookExists).toBe(true);
  });

  test("User login and get token", async () => {
    const credentials = {
      userName: "testuser123",
      password: "Test@1234",
    };
    const response = await axios.post(
      "https://demoqa.com/Account/v1/Login",
      credentials
    );
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
  });

  test("Get user info without token returns 401", async () => {
    const userName = "testuser123";
    try {
      await axios.get(`https://demoqa.com/Account/v1/User/${userName}`);
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test("User login and get token", async () => {
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
    expect(response.data.expires).toBeDefined();
  });
});

import axios from 'axios';

const baseURL = 'https://gorest.co.in/public/v2';
const token = '1b83ef9f86a6f4f268239e32c9e974ecd2817d23fed9cff746f34d53cb7d33f0'; 

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

describe('GET - all users', () => {
  test('should fetch first page of users', async () => {
    const response = await axiosInstance.get('/users?page=1');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should fetch second page of users', async () => {
    const response = await axiosInstance.get('/users?page=2');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should return user count per page as 10 by default', async () => {
    const response = await axiosInstance.get('/users');
    expect(response.status).toBe(200);
    expect(response.data.length).toBeLessThanOrEqual(10);
  });

  test('each user should have an id and email field', async () => {
    const response = await axiosInstance.get('/users');
    response.data.forEach(user => {
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
    });
  });

  test('should return 400 or 404 for invalid page number', async () => {
    try {
      await axiosInstance.get('/users?page=9999999999');
    } catch (error) {
      expect([400, 404]).toContain(error.response.status);
    }
  });
});

describe('GET - single user', () => {
  let userId;

  beforeAll(async () => {
    // Створюємо користувача для тестування
    const response = await axiosInstance.post('/users', {
      name: "Test User For GET",
      email: `testgetuser${Date.now()}@example.com`,
      gender: "male",
      status: "active"
    });
    userId = response.data.id;
  });

  afterAll(async () => {
    // Видаляємо створеного користувача
    await axiosInstance.delete(`/users/${userId}`);
  });

  test('should fetch user by id', async () => {
    const response = await axiosInstance.get(`/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id', userId);
  });

  test('should check user email format', async () => {
    const response = await axiosInstance.get(`/users/${userId}`);
    expect(response.data.email).toMatch(/\S+@\S+\.\S+/);
  });

  test('should return 404 for non-existent user', async () => {
    try {
      await axiosInstance.get('/users/999999999');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });

  test('should have name and gender fields', async () => {
    const response = await axiosInstance.get(`/users/${userId}`);
    expect(response.data).toHaveProperty('name');
    expect(response.data).toHaveProperty('gender');
  });

  test('user status should be either active or inactive', async () => {
    const response = await axiosInstance.get(`/users/${userId}`);
    expect(['active', 'inactive']).toContain(response.data.status);
  });
});

describe('POST - create user', () => {
  let userId;

  afterEach(async () => {
    if (userId) {
      await axiosInstance.delete(`/users/${userId}`);
      userId = null;
    }
  });

  test('should create a new user successfully', async () => {
    const response = await axiosInstance.post('/users', {
      name: "Test User POST",
      email: `testpostuser${Date.now()}@example.com`,
      gender: "male",
      status: "active"
    });
    userId = response.data.id;
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');
  });

  test('should fail creating user with invalid email', async () => {
    try {
      await axiosInstance.post('/users', {
        name: "Invalid Email User",
        email: 'not-an-email',
        gender: "male",
        status: "active"
      });
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });

  test('should fail creating user with missing required field', async () => {
    try {
      await axiosInstance.post('/users', {
        email: `missingname${Date.now()}@example.com`,
        gender: "male",
        status: "active"
      });
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });

  test('should create user with status inactive', async () => {
    const response = await axiosInstance.post('/users', {
      name: "Inactive User",
      email: `inactiveuser${Date.now()}@example.com`,
      gender: "male",
      status: "inactive"
    });
    userId = response.data.id;
    expect(response.data.status).toBe('inactive');
  });

  test('should create user with gender female', async () => {
    const response = await axiosInstance.post('/users', {
      name: "Female User",
      email: `femaleuser${Date.now()}@example.com`,
      gender: "female",
      status: "active"
    });
    userId = response.data.id;
    expect(response.data.gender).toBe('female');
  });
});

describe('PUT - update user', () => {
  let userId;

  beforeEach(async () => {
    // Створюємо користувача перед оновленням
    const response = await axiosInstance.post('/users', {
      name: "User To Update",
      email: `updateuser${Date.now()}@example.com`,
      gender: "male",
      status: "active"
    });
    userId = response.data.id;
  });

  afterEach(async () => {
    // Видаляємо користувача після оновлення
    await axiosInstance.delete(`/users/${userId}`);
  });

  test('should update user name and status', async () => {
    const response = await axiosInstance.put(`/users/${userId}`, {
      name: "Updated Name",
      status: "inactive"
    });
    expect(response.status).toBe(200);
    expect(response.data.name).toBe("Updated Name");
    expect(response.data.status).toBe("inactive");
  });

  test('should update only status', async () => {
    const response = await axiosInstance.put(`/users/${userId}`, {
      status: "inactive"
    });
    expect(response.status).toBe(200);
    expect(response.data.status).toBe("inactive");
  });

  test('should return 422 for invalid update data', async () => {
    try {
      await axiosInstance.put(`/users/${userId}`, {
        email: "invalid-email"
      });
    } catch (error) {
      expect(error.response.status).toBe(422);
    }
  });

  test('should update gender to female', async () => {
    const response = await axiosInstance.put(`/users/${userId}`, {
      gender: "female"
    });
    expect(response.status).toBe(200);
    expect(response.data.gender).toBe("female");
  });

  test('should update user with empty body (no changes)', async () => {
    const response = await axiosInstance.put(`/users/${userId}`, {});
    expect(response.status).toBe(200);
    expect(response.data.id).toBe(userId);
  });
});

describe('DELETE - delete user', () => {
  let userId;

  beforeEach(async () => {
    // Створюємо користувача перед видаленням
    const response = await axiosInstance.post('/users', {
      name: "User To Delete",
      email: `deleteuser${Date.now()}@example.com`,
      gender: "male",
      status: "active"
    });
    userId = response.data.id;
  });

  test('should delete user successfully', async () => {
    const response = await axiosInstance.delete(`/users/${userId}`);
    expect(response.status).toBe(204);
  });

  test('should return 404 for deleting non-existent user', async () => {
    await axiosInstance.delete(`/users/${userId}`); // спочатку видаляємо
    try {
      await axiosInstance.delete(`/users/${userId}`); // пробуємо видалити знову
    } catch (error) {
      expect([404, 405]).toContain(error.response.status);
    }
  });

  test('should return 405 or 404 when deleting without id (invalid endpoint)', async () => {
    try {
      await axiosInstance.delete(`/users/`);
    } catch (error) {
      expect([404, 405]).toContain(error.response.status);
    }
  });

  test('should return 404 when deleting with invalid id', async () => {
    try {
      await axiosInstance.delete('/users/invalid-id');
    } catch (error) {
      expect([404, 405]).toContain(error.response.status);
    }
  });

  test('should delete user twice gracefully (second should 404)', async () => {
    await axiosInstance.delete(`/users/${userId}`);
    try {
      await axiosInstance.delete(`/users/${userId}`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
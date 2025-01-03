# 📘 API Documentation

This documentation outlines the API configuration, available routes, and their functionalities.

---

## ⚙️ Configuration

### 📄 Environment Variables (`config.env`)

```env
PORT=3333
DATABASE=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
DATABASE_PASSWORD=<db_password>
```

### 🛠 Setting up Environment Variables

- **`PORT`**: Specifies the port number where the server will run.
- **`DATABASE`**: MongoDB connection string with placeholder for `<password>`.
- **`DATABASE_PASSWORD`**: Password for the database user.

---

## 🚀 Available Routes

### 👤 User Routes

**Base URL:** `/api/v1/users`

#### 1️⃣ Get All Users
- **Endpoint:** `GET /`
- **Description:** Retrieves a list of all users.
- **Response Example:**
  ```json
  {
    "status": "success",
    "results": 5,
    "data": {
      "users": [
        {
          "_id": "64b9a0e01a1234abcd567890",
          "nickname": "user1",
          "role": "admin"
        },
        {
          "_id": "64b9a0e01a1234abcd567891",
          "nickname": "user2",
          "role": "user"
        }
      ]
    }
  }
  ```

#### 2️⃣ Get User by ID
- **Endpoint:** `GET /:id`
- **Description:** Retrieves a user by their unique ID.
- **Response Example:**
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "_id": "64b9a0e01a1234abcd567890",
        "nickname": "user1",
        "role": "admin"
      }
    }
  }
  ```

---

### 🛒 Product Routes

**Base URL:** `/api/v1/products`

#### 1️⃣ Get All Products
- **Endpoint:** `GET /`
- **Description:** Retrieves a list of all products.
- **Response Example:**
  ```json
  {
    "status": "success",
    "results": 3,
    "data": {
      "products": [
        {
          "_id": "64b9a0e01a1234abcd567890",
          "name": "Product 1",
          "price": 19.99
        },
        {
          "_id": "64b9a0e01a1234abcd567891",
          "name": "Product 2",
          "price": 29.99
        }
      ]
    }
  }
  ```

#### 2️⃣ Get Product by ID
- **Endpoint:** `GET /:id`
- **Description:** Retrieves a product by its unique ID.
- **Response Example:**
  ```json
  {
    "status": "success",
    "data": {
      "product": {
        "_id": "64b9a0e01a1234abcd567890",
        "name": "Product 1",
        "price": 19.99
      }
    }
  }
  ```

#### 3️⃣ Get 3 Newest Products
- **Endpoint:** `GET /newest`
- **Description:** Retrieves the 3 newest products.
- **Response Example:**
  ```json
  {
    "status": "success",
    "results": 3,
    "data": {
      "products": [
        {
          "_id": "64b9a0e01a1234abcd567892",
          "name": "Newest Product 1",
          "price": 29.99
        },
        {
          "_id": "64b9a0e01a1234abcd567891",
          "name": "Newest Product 2",
          "price": 19.99
        }
      ]
    }
  }
  ```

---

### ✉️ Message Routes

**Base URL:** `/api/v1/messages`

#### 1️⃣ Get All Messages
- **Endpoint:** `GET /`
- **Description:** Retrieves a list of all messages.
- **Response Example:**
  ```json
  {
    "status": "success",
    "results": 2,
    "data": {
      "messages": [
        {
          "_id": "64b9a0e01a1234abcd567890",
          "name": "John Doe",
          "email": "john@example.com",
          "company": "Example Corp",
          "message": "Hello, this is a test message."
        },
        {
          "_id": "64b9a0e01a1234abcd567891",
          "name": "Jane Smith",
          "email": "jane@example.com",
          "company": "Tech Solutions",
          "message": "Hi, I'm interested in your services."
        }
      ]
    }
  }
  ```

#### 2️⃣ Get Message by ID
- **Endpoint:** `GET /:id`
- **Description:** Retrieves a message by its unique ID.
- **Response Example:**
  ```json
  {
    "status": "success",
    "data": {
      "message": {
        "_id": "64b9a0e01a1234abcd567890",
        "name": "John Doe",
        "email": "john@example.com",
        "company": "Example Corp",
        "message": "Hello, this is a test message."
      }
    }
  }
  ```

---

## 🧪 Testing the API

1. Start the server:
   ```bash
   nodemon server.js
   ```
2. Use a tool like Postman or cURL to test the endpoints.
3. Verify responses match the examples provided above.

---

## 📝 Notes

- Ensure your database connection string is correctly configured in the `config.env` file.
- Make sure your MongoDB cluster is accessible and your IP is whitelisted in MongoDB Atlas.


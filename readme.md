# 📘 API Documentation

This documentation outlines the API configuration, available routes, and their functionalities.

---

## ⚙️ Configuration

### 📄 Environment Variables (`config.env`)

```env
PORT=
DATABASE=
DATABASE_PASSWORD=
JWT_SECRET=
TOKEN_EXPIRATION=
MAX_REQUESTS_PER_DAY=
```

### 🛠 Setting up Environment Variables

- **`PORT`**: Specifies the port number where the server will run.  
- **`DATABASE`**: MongoDB connection string with a placeholder for `<password>`.  
- **`DATABASE_PASSWORD`**: The password for the database user.  
- **`JWT_SECRET`**: A string used for encryption.  
- **`TOKEN_EXPIRATION`**: Enter a number specifying how long the token is valid.  
- **`MAX_REQUESTS_PER_DAY`**: Enter a number specifying the maximum messages sent per day from one IP address.  
---


## 🧪 Starting API

1. Start the server:
   ```bash
   npm start
   ```
2. Use a tool like Postman or cURL to test the endpoints.


## 📝 Notes

- Ensure your database connection string is correctly configured in the `config.env` file.
- Make sure your MongoDB cluster is accessible and your IP is whitelisted in MongoDB Atlas.

---

### 👤 **Roles and Permissions**  

#### There are two roles in this API:

- **Admin**:  
  - Can perform all actions except deleting itself.  

- **User**:  
  - Can get messages.  
  - Can export messages.  
  - Can create products.  
  - Can see all users.  

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
  "results": 3,
  "data": {
    "users": [
      {
        "_id": "678e4d29a23904b60cfe9f80",
        "nickname": "user1",
        "role": "admin",
        "createdAt": "2025-01-20T13:18:33.011Z",
        "updatedAt": "2025-01-20T13:18:33.011Z",
        "__v": 0
      },
      {
        "_id": "6780d3139c72c52fe4b4fbec",
        "nickname": "user2",
        "role": "user",
        "createdAt": "2025-01-10T07:58:11.440Z",
        "updatedAt": "2025-01-10T07:58:11.440Z",
        "__v": 0
      }
    ]
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
#### 3️⃣ Login User
- **Endpoint:** `POST /login`
- **Description:** Logins User.
- **Response Example:**
  ```json
  {
    
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

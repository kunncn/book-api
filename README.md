## Book API
API documentation for the Book Management API

### API Reference

#### Authentication and User Management

**Register (POST)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/auth/register`
- **Arguments**:
  | Argument | Type     | Description                    |
  |----------|----------|--------------------------------|
  | username | string   | Required, e.g., `testuser`    |
  | password | string   | Required, e.g., `testpassword` |
  | role     | string   | Required, e.g., `user`        |

**Login (POST)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/auth/login`
- **Arguments**:
  | Argument | Type     | Description                    |
  |----------|----------|--------------------------------|
  | username | string   | Required, e.g., `testuser`    |
  | password | string   | Required, e.g., `testpassword` |

---

#### Book Management API

**Get All Books (GET)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/books`
- **Description**: Retrieves a list of all books.

**Add a New Book (POST)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/books`
- **Arguments**:
  | Argument     | Type     | Description                                     |
  |--------------|----------|-------------------------------------------------|
  | title        | string   | Required, e.g., `Node.js Design Patterns`      |
  | author       | string   | Required, e.g., `Mario Casciaro`               |
  | description  | string   | Required, e.g., `A comprehensive guide to Node.js design patterns` |
  | price        | float    | Required, e.g., `29.99`                        |

**Get Single Book (GET)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/books/{id}`
- **Arguments**:
  | Argument | Type   | Description                   |
  |----------|--------|-------------------------------|
  | id       | string | Required, e.g., `1`          |

**Update Book (PUT)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/books/{id}`
- **Arguments**:
  | Argument     | Type     | Description                                     |
  |--------------|----------|-------------------------------------------------|
  | id           | string   | Required, e.g., `1`                            |
  | title        | string   | Optional, e.g., `Node.js Design Patterns`      |
  | author       | string   | Optional, e.g., `Mario Casciaro`               |
  | description  | string   | Optional, e.g., `A comprehensive guide to Node.js design patterns` |
  | price        | float    | Optional, e.g., `29.99`                        |

**Delete Book (DELETE)**
- **Endpoint**: `https://testingbookapi.up.railway.app/api/books/{id}`
- **Arguments**:
  | Argument | Type   | Description                   |
  |----------|--------|-------------------------------|
  | id       | string | Required, e.g., `1`          |

---

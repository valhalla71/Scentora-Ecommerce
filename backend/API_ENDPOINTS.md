# Scentora API Endpoints Reference

## Base URL
```
http://localhost:3001/api/v1
```

## Authentication
Protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer {access_token}
```

## Response Format

### Success Response (2xx)
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {},
  "timestamp": "2024-01-15T10:30:45.123Z",
  "path": "/api/v1/products"
}
```

### Error Response (4xx, 5xx)
```json
{
  "statusCode": 400,
  "message": "Invalid request",
  "error": "BAD_REQUEST",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "path": "/api/v1/users"
}
```

---

## Health Endpoints

### Check API Health
```http
GET /health
```
**Response**: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "uptime": 3600.5
}
```

### Check Readiness
```http
GET /health/ready
```
**Response**: `200 OK`
```json
{
  "ready": true,
  "timestamp": "2024-01-15T10:30:45.123Z"
}
```

---

## Authentication Endpoints

### User Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
**Response**: `200 OK`
```json
{
  "user": {
    "id": "cly1234567890",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "token": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### Refresh Token
```http
POST /auth/refresh
Authorization: Bearer {access_token}
```
**Response**: `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "7d"
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer {access_token}
```
**Response**: `200 OK`
```json
{
  "id": "cly1234567890",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

---

## Users Endpoints

### List All Users
```http
GET /users?page=1&limit=10
```
**Response**: `200 OK`
```json
{
  "users": [
    {
      "id": "cly1234567890",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "status": "ACTIVE",
      "createdAt": "2024-01-15T10:30:45.123Z",
      "updatedAt": "2024-01-15T10:30:45.123Z"
    }
  ],
  "total": 100
}
```

### Create User
```http
POST /users
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+1987654321"
}
```
**Response**: `201 Created`

### Get User by ID
```http
GET /users/{id}
```
**Response**: `200 OK`

### Update User
```http
PUT /users/{id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+1987654321"
}
```
**Response**: `200 OK`

### Delete User
```http
DELETE /users/{id}
Authorization: Bearer {access_token}
```
**Response**: `204 No Content`

---

## Products Endpoints

### List All Products
```http
GET /products?page=1&limit=20
```
**Response**: `200 OK`
```json
{
  "products": [
    {
      "id": "prod_123",
      "name": "J'adore Eau de Parfum",
      "slug": "jadore-eau-de-parfum",
      "description": "A luxurious floral fragrance",
      "price": 150.00,
      "cost": 75.00,
      "status": "ACTIVE",
      "category": {
        "id": "cat_123",
        "name": "Perfumes"
      },
      "brand": {
        "id": "brand_123",
        "name": "Dior"
      },
      "images": [
        {
          "id": "img_123",
          "url": "https://cdn.example.com/jadore.jpg",
          "alt": "J'adore bottle",
          "isPrimary": true
        }
      ],
      "inventory": {
        "quantity": 100,
        "reserved": 5,
        "available": 95
      },
      "createdAt": "2024-01-15T10:30:45.123Z",
      "updatedAt": "2024-01-15T10:30:45.123Z"
    }
  ],
  "total": 245
}
```

### Create Product
```http
POST /products
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "Fragrance Name",
  "description": "Product description",
  "price": 99.99,
  "cost": 50.00,
  "categoryId": "cat_123",
  "brandId": "brand_123"
}
```
**Response**: `201 Created`

### Search Products
```http
GET /products/search?q=perfume&page=1&limit=10
```
**Response**: `200 OK` (same structure as list)

### Get Product by ID
```http
GET /products/{id}
```
**Response**: `200 OK`

### Get Product by Slug
```http
GET /products/slug/{slug}
```
**Response**: `200 OK`

### Update Product
```http
PUT /products/{id}
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 109.99
}
```
**Response**: `200 OK`

### Delete Product
```http
DELETE /products/{id}
Authorization: Bearer {access_token}
```
**Response**: `204 No Content`

---

## Categories Endpoints

### List All Categories
```http
GET /categories
```
**Response**: `200 OK`
```json
[
  {
    "id": "cat_123",
    "name": "Perfumes",
    "slug": "perfumes",
    "description": "Premium perfumes",
    "image": "https://cdn.example.com/perfumes.jpg",
    "products": [...]
  }
]
```

### Get Category by ID
```http
GET /categories/{id}
```
**Response**: `200 OK`

---

## Brands Endpoints

### List All Brands
```http
GET /brands
```
**Response**: `200 OK`
```json
[
  {
    "id": "brand_123",
    "name": "Dior",
    "slug": "dior",
    "description": "Luxury brand Dior",
    "products": [...]
  }
]
```

### Get Brand by ID
```http
GET /brands/{id}
```
**Response**: `200 OK`

---

## Cart Endpoints

### Get User Cart
```http
GET /cart
Authorization: Bearer {access_token}
```
**Response**: `200 OK`
```json
{
  "id": "cart_123",
  "userId": "user_123",
  "status": "ACTIVE",
  "items": [
    {
      "id": "item_123",
      "productId": "prod_123",
      "quantity": 2,
      "product": {
        "id": "prod_123",
        "name": "J'adore Eau de Parfum",
        "price": 150.00
      }
    }
  ]
}
```

### Add Item to Cart
```http
POST /cart/items
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "productId": "prod_123",
  "quantity": 2
}
```
**Response**: `201 Created`

### Remove Item from Cart
```http
DELETE /cart/items/{productId}
Authorization: Bearer {access_token}
```
**Response**: `200 OK`

### Clear Cart
```http
DELETE /cart
Authorization: Bearer {access_token}
```
**Response**: `200 OK`

---

## Wishlist Endpoints

### Get User Wishlist
```http
GET /wishlist
Authorization: Bearer {access_token}
```
**Response**: `200 OK`
```json
{
  "id": "wishlist_123",
  "userId": "user_123",
  "items": [
    {
      "id": "item_123",
      "productId": "prod_123",
      "product": {...}
    }
  ]
}
```

### Add Item to Wishlist
```http
POST /wishlist/items/{productId}
Authorization: Bearer {access_token}
```
**Response**: `201 Created`

### Remove Item from Wishlist
```http
DELETE /wishlist/items/{productId}
Authorization: Bearer {access_token}
```
**Response**: `200 OK`

---

## Orders Endpoints

### List User Orders
```http
GET /orders?page=1&limit=10
Authorization: Bearer {access_token}
```
**Response**: `200 OK`
```json
{
  "orders": [
    {
      "id": "order_123",
      "userId": "user_123",
      "orderNumber": "ORD-1705310445000",
      "status": "PENDING",
      "subtotal": 300.00,
      "tax": 30.00,
      "shippingCost": 10.00,
      "total": 340.00,
      "items": [
        {
          "id": "item_123",
          "productId": "prod_123",
          "quantity": 2,
          "price": 150.00,
          "total": 300.00
        }
      ],
      "payment": {
        "method": "CREDIT_CARD",
        "status": "PENDING"
      },
      "shipping": {
        "method": "STANDARD",
        "cost": 10.00,
        "estimatedDate": "2024-01-20T00:00:00Z"
      },
      "createdAt": "2024-01-15T10:30:45.123Z"
    }
  ],
  "total": 45
}
```

### Create Order
```http
POST /orders
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "subtotal": 300.00,
  "tax": 30.00,
  "shippingCost": 10.00,
  "total": 340.00,
  "items": [
    {
      "productId": "prod_123",
      "quantity": 2,
      "price": 150.00,
      "total": 300.00
    }
  ]
}
```
**Response**: `201 Created`

### Get Order by ID
```http
GET /orders/{id}
Authorization: Bearer {access_token}
```
**Response**: `200 OK`

---

## Reviews Endpoints

### Get Product Reviews
```http
GET /reviews/product/{productId}?page=1&limit=10
```
**Response**: `200 OK`
```json
{
  "reviews": [
    {
      "id": "review_123",
      "productId": "prod_123",
      "userId": "user_123",
      "rating": 5,
      "title": "Excellent product!",
      "content": "Best perfume I've ever used",
      "helpful": 45,
      "status": "APPROVED",
      "createdAt": "2024-01-15T10:30:45.123Z"
    }
  ],
  "total": 125
}
```

### Create Review
```http
POST /reviews
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "productId": "prod_123",
  "rating": 5,
  "title": "Great product",
  "content": "Really loved this product"
}
```
**Response**: `201 Created`

### Get My Reviews
```http
GET /reviews/user/my-reviews
Authorization: Bearer {access_token}
```
**Response**: `200 OK`

---

## Query Parameters

### Pagination
All list endpoints support pagination:
- `page` (default: 1) - Page number
- `limit` (default: 10, max: 100) - Items per page

Example:
```http
GET /products?page=2&limit=20
```

### Search
Product search endpoint:
```http
GET /products/search?q=perfume&page=1&limit=10
```

---

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

---

## Status Codes

### User Status
- `ACTIVE` - User is active
- `INACTIVE` - User is inactive
- `SUSPENDED` - User is suspended
- `DELETED` - User is deleted

### Product Status
- `ACTIVE` - Product is available
- `INACTIVE` - Product is inactive
- `DISCONTINUED` - Product is discontinued
- `OUT_OF_STOCK` - Product is out of stock

### Order Status
- `PENDING` - Order placed
- `CONFIRMED` - Order confirmed
- `PROCESSING` - Order being processed
- `SHIPPED` - Order shipped
- `DELIVERED` - Order delivered
- `CANCELLED` - Order cancelled
- `RETURNED` - Order returned

### Review Status
- `PENDING` - Awaiting moderation
- `APPROVED` - Approved
- `REJECTED` - Rejected

---

## Rate Limiting (Future)
Rate limiting headers (when implemented):
- `X-RateLimit-Limit`
- `X-RateLimit-Remaining`
- `X-RateLimit-Reset`

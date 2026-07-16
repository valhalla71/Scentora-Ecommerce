# Scentora API Response Standard

**Version**: 1.0  
**Date**: July 16, 2026  
**Status**: Documented

---

## Overview

This document defines the standardized response format for all Scentora API endpoints. All endpoints must follow these standards to ensure consistency, maintainability, and predictable client behavior.

---

## Success Response Format

### Basic Success Response

**HTTP Status Code**: 200 OK, 201 Created, 204 No Content

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "...",
    "name": "...",
    "...": "..."
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/products/123"
}
```

### Paginated List Response

**HTTP Status Code**: 200 OK

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": [
    { "id": "1", "name": "Product 1" },
    { "id": "2", "name": "Product 2" }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/products"
}
```

### Empty Success Response

**HTTP Status Code**: 204 No Content

```json
{
  "statusCode": 204,
  "message": "Success",
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/cart"
}
```

### Authentication Success Response

**HTTP Status Code**: 200 OK

```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "abc123...",
      "expiresIn": "24h"
    }
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/auth/login"
}
```

---

## Error Response Format

### Validation Error Response

**HTTP Status Code**: 400 Bad Request

```json
{
  "statusCode": 400,
  "error": "BAD_REQUEST",
  "message": "Validation failed: email must be a valid email, password must contain at least 8 characters",
  "path": "/api/v1/auth/register",
  "method": "POST",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

### Unauthorized Error Response

**HTTP Status Code**: 401 Unauthorized

```json
{
  "statusCode": 401,
  "error": "UNAUTHORIZED",
  "message": "Invalid email or password",
  "path": "/api/v1/auth/login",
  "method": "POST",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

**No Token Provided:**
```json
{
  "statusCode": 401,
  "error": "UNAUTHORIZED",
  "message": "No token provided",
  "path": "/api/v1/cart",
  "method": "GET",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

**Invalid Token:**
```json
{
  "statusCode": 401,
  "error": "UNAUTHORIZED",
  "message": "Invalid or expired token",
  "path": "/api/v1/cart",
  "method": "GET",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

### Forbidden Error Response

**HTTP Status Code**: 403 Forbidden

```json
{
  "statusCode": 403,
  "error": "FORBIDDEN",
  "message": "Insufficient permissions",
  "path": "/api/v1/products",
  "method": "POST",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

### Not Found Error Response

**HTTP Status Code**: 404 Not Found

```json
{
  "statusCode": 404,
  "error": "NOT_FOUND",
  "message": "Product with ID abc123 not found",
  "path": "/api/v1/products/abc123",
  "method": "GET",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

### Conflict Error Response

**HTTP Status Code**: 409 Conflict

```json
{
  "statusCode": 409,
  "error": "CONFLICT",
  "message": "Email already registered",
  "path": "/api/v1/auth/register",
  "method": "POST",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

### Internal Server Error Response

**HTTP Status Code**: 500 Internal Server Error

```json
{
  "statusCode": 500,
  "error": "INTERNAL_SERVER_ERROR",
  "message": "Internal server error",
  "path": "/api/v1/products",
  "method": "GET",
  "timestamp": "2026-07-16T10:30:45.123Z"
}
```

---

## Response Field Definitions

### Common Fields (All Responses)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `statusCode` | number | ✅ | HTTP status code (200, 201, 400, 401, etc.) |
| `timestamp` | string (ISO 8601) | ✅ | Response generation timestamp |
| `path` | string | ✅ | Request path (e.g., `/api/v1/products`) |

### Success Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | ✅ | Success message (typically "Success") |
| `data` | object/array/null | ✅ | Response payload or resource data |
| `pagination` | object | ❌ | Pagination metadata (for list endpoints) |

### Error Response Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `error` | string | ✅ | Error type code (BAD_REQUEST, UNAUTHORIZED, etc.) |
| `message` | string | ✅ | Detailed error message |
| `method` | string | ✅ | HTTP method (GET, POST, PUT, DELETE) |

### Pagination Fields

| Field | Type | Description |
|-------|------|-------------|
| `page` | number | Current page number (1-indexed) |
| `limit` | number | Items per page |
| `total` | number | Total items in database |
| `totalPages` | number | Total number of pages |
| `hasNext` | boolean | Whether next page exists |
| `hasPrev` | boolean | Whether previous page exists |

---

## HTTP Status Codes

### Success (2xx)

| Code | Use Case |
|------|----------|
| `200` | GET, PUT, DELETE successful; general success |
| `201` | POST successful; resource created |
| `204` | DELETE successful; no content to return |

### Client Error (4xx)

| Code | Use Case |
|------|----------|
| `400` | Validation failed; malformed request |
| `401` | No/invalid token; user not authenticated |
| `403` | Authenticated but insufficient permissions |
| `404` | Resource not found |
| `409` | Conflict; e.g., duplicate email |

### Server Error (5xx)

| Code | Use Case |
|------|----------|
| `500` | Unexpected server error |

---

## Error Types

### Authentication Errors

| Error | Status | Message | Example |
|-------|--------|---------|---------|
| `UNAUTHORIZED` | 401 | "No token provided" | Missing Authorization header |
| `UNAUTHORIZED` | 401 | "Invalid or expired token" | Malformed or expired JWT |
| `UNAUTHORIZED` | 401 | "Invalid email or password" | Login failure |
| `UNAUTHORIZED` | 401 | "User not found or inactive" | Account disabled |

### Authorization Errors

| Error | Status | Message | Example |
|-------|--------|---------|---------|
| `FORBIDDEN` | 403 | "Access denied" | User not authenticated |
| `FORBIDDEN` | 403 | "Insufficient permissions" | User lacks required role |

### Validation Errors

| Error | Status | Message | Example |
|-------|--------|---------|---------|
| `BAD_REQUEST` | 400 | "Validation failed: [details]" | Invalid email format |
| `BAD_REQUEST` | 400 | "Field is required" | Missing mandatory field |

### Resource Errors

| Error | Status | Message | Example |
|-------|--------|---------|---------|
| `NOT_FOUND` | 404 | "[Resource] with ID [id] not found" | Product doesn't exist |
| `CONFLICT` | 409 | "Email already registered" | Duplicate unique field |

### Server Errors

| Error | Status | Message | Example |
|-------|--------|---------|---------|
| `INTERNAL_SERVER_ERROR` | 500 | "Internal server error" | Unhandled exception |

---

## Endpoint Categories & Response Examples

### 1. Authentication Endpoints

#### Register
**Request**: `POST /api/v1/auth/register`
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "message": "Success",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "refresh_token_123",
      "expiresIn": "24h"
    }
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/auth/register"
}
```

#### Login
**Request**: `POST /api/v1/auth/login`
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "status": "ACTIVE"
    },
    "token": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "refresh_token_123",
      "expiresIn": "24h"
    }
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/auth/login"
}
```

### 2. Product Endpoints

#### List Products
**Request**: `GET /api/v1/products?page=1&limit=10`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "id": "product_1",
      "name": "Premium Oud Perfume",
      "slug": "premium-oud-perfume",
      "description": "...",
      "price": 150.00,
      "status": "ACTIVE"
    },
    {
      "id": "product_2",
      "name": "Rose Essence",
      "slug": "rose-essence",
      "description": "...",
      "price": 120.00,
      "status": "ACTIVE"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/products"
}
```

#### Get Single Product
**Request**: `GET /api/v1/products/product_1`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "product_1",
    "name": "Premium Oud Perfume",
    "slug": "premium-oud-perfume",
    "description": "Luxurious oud fragrance...",
    "price": 150.00,
    "cost": 75.00,
    "status": "ACTIVE",
    "categoryId": "cat_1",
    "brandId": "brand_1",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-07-16T10:30:45.123Z"
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/products/product_1"
}
```

#### Create Product (Admin Only)
**Request**: `POST /api/v1/products`
```json
{
  "name": "New Fragrance",
  "description": "...",
  "price": 99.99,
  "cost": 50.00,
  "categoryId": "cat_1",
  "brandId": "brand_1"
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "message": "Success",
  "data": {
    "id": "product_new",
    "name": "New Fragrance",
    "slug": "new-fragrance",
    "price": 99.99,
    "cost": 50.00,
    "status": "ACTIVE",
    "createdAt": "2026-07-16T10:30:45.123Z",
    "updatedAt": "2026-07-16T10:30:45.123Z"
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/products"
}
```

### 3. Cart Endpoints

#### Get Cart
**Request**: `GET /api/v1/cart`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "id": "cart_123",
    "userId": "user_123",
    "items": [
      {
        "id": "cartitem_1",
        "productId": "product_1",
        "quantity": 2,
        "product": {
          "id": "product_1",
          "name": "Premium Oud Perfume",
          "price": 150.00
        }
      }
    ],
    "total": 300.00,
    "status": "ACTIVE",
    "createdAt": "2026-07-16T10:00:00Z"
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/cart"
}
```

#### Add to Cart
**Request**: `POST /api/v1/cart/items`
```json
{
  "productId": "product_1",
  "quantity": 1
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "message": "Success",
  "data": {
    "id": "cartitem_2",
    "cartId": "cart_123",
    "productId": "product_1",
    "quantity": 1,
    "addedAt": "2026-07-16T10:30:45.123Z"
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/cart/items"
}
```

### 4. Order Endpoints

#### Create Order
**Request**: `POST /api/v1/orders`
```json
{
  "items": [...],
  "shippingAddressId": "address_1",
  "paymentMethod": "CREDIT_CARD"
}
```

**Success Response (201)**:
```json
{
  "statusCode": 201,
  "message": "Success",
  "data": {
    "id": "order_123",
    "orderNumber": "ORD-2026-001",
    "status": "PENDING",
    "subtotal": 300.00,
    "tax": 30.00,
    "shippingCost": 10.00,
    "total": 340.00,
    "createdAt": "2026-07-16T10:30:45.123Z"
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/orders"
}
```

#### Get User Orders
**Request**: `GET /api/v1/orders?page=1&limit=10`

**Success Response (200)**:
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "id": "order_1",
      "orderNumber": "ORD-2026-001",
      "status": "DELIVERED",
      "total": 340.00,
      "createdAt": "2026-06-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNext": false,
    "hasPrev": false
  },
  "timestamp": "2026-07-16T10:30:45.123Z",
  "path": "/api/v1/orders"
}
```

---

## Implementation Guidelines

### For Developers

1. **Always include standardized fields**: Every response must include `statusCode`, `timestamp`, and `path`

2. **Use appropriate HTTP status codes**: Don't return 200 for errors

3. **Include pagination for lists**: All list endpoints must include pagination metadata

4. **Provide detailed error messages**: Error messages should explain what went wrong

5. **Never expose sensitive data in errors**: Don't include passwords, full stack traces, or database details

6. **Maintain consistency**: Follow the format exactly for all endpoints

7. **Include data even on errors**: Let clients know what resource had the error

### For API Consumers

1. **Always check statusCode**: This is the source of truth for success/failure

2. **Handle pagination**: Implement pagination using page/limit parameters

3. **Parse error.error field**: Use this for programmatic error handling

4. **Don't rely on HTTP status for business logic**: Use the statusCode field instead

5. **Include timestamps in logs**: Use the timestamp field for correlation

---

## Response Variations by Endpoint Type

### List Endpoints
- Must include `pagination` metadata
- `data` is an array
- Example: `GET /products`, `GET /orders`

### Single Resource Endpoints
- No pagination needed
- `data` is an object
- Example: `GET /products/123`

### Creation Endpoints
- Status code is 201
- Return the created resource
- Example: `POST /products`

### Update Endpoints
- Status code is 200
- Return updated resource
- Example: `PUT /products/123`

### Deletion Endpoints
- Status code is 204 (No Content)
- No data field
- Example: `DELETE /products/123`

### Action Endpoints
- Status code is 200
- Return action result
- Example: `POST /cart/items`

---

## Transition Plan

This API response standard is now documented. During Phase 1B implementation, responses will be reviewed for compliance with these standards. Any deviations will be documented and corrected as part of stabilization efforts.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-07-16 | Initial standard documentation |

---


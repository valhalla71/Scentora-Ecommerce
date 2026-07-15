# Scentora API Endpoints

## Authentication Endpoints

### Register User
- **POST** `/api/v1/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass@123",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```
- **Response:** User object with JWT tokens (accessToken, refreshToken)

### Login
- **POST** `/api/v1/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePass@123"
  }
  ```
- **Response:** User object with JWT tokens

### Refresh Token
- **POST** `/api/v1/auth/refresh`
- **Body:**
  ```json
  {
    "refreshToken": "token_string"
  }
  ```
- **Response:** New access and refresh tokens

### Change Password
- **POST** `/api/v1/auth/change-password`
- **Auth:** Required (Bearer token)
- **Body:**
  ```json
  {
    "currentPassword": "OldPass@123",
    "newPassword": "NewPass@123"
  }
  ```

### Logout
- **POST** `/api/v1/auth/logout`
- **Auth:** Required (Bearer token)
- **Body:**
  ```json
  {
    "refreshToken": "token_string"
  }
  ```

### Get Current User
- **GET** `/api/v1/auth/me`
- **Auth:** Required (Bearer token)

## User Management Endpoints

### Get User Profile
- **GET** `/api/v1/users/profile/me`
- **Auth:** Required

### Update User Profile
- **PUT** `/api/v1/users/:id`
- **Auth:** Required
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }
  ```

### Get All Users
- **GET** `/api/v1/users?page=1&limit=10`
- **Query:** page, limit

### Get User by ID
- **GET** `/api/v1/users/:id`

### Delete User
- **DELETE** `/api/v1/users/:id`
- **Auth:** Required

## User Preferences

### Get Preferences
- **GET** `/api/v1/users/preferences/me`
- **Auth:** Required

### Update Preferences
- **PUT** `/api/v1/users/preferences/me`
- **Auth:** Required
- **Body:**
  ```json
  {
    "language": "en",
    "theme": "dark",
    "emailNotifications": true
  }
  ```

## Address Management

### Get All Addresses
- **GET** `/api/v1/users/addresses/me`
- **Auth:** Required

### Create Address
- **POST** `/api/v1/users/addresses`
- **Auth:** Required
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "phone": "+1234567890",
    "address": "123 Main St",
    "city": "Los Angeles",
    "state": "CA",
    "zipCode": "90001",
    "country": "USA",
    "type": "BILLING",
    "isDefault": true
  }
  ```

### Get Address by ID
- **GET** `/api/v1/users/addresses/:id`
- **Auth:** Required

### Update Address
- **PUT** `/api/v1/users/addresses/:id`
- **Auth:** Required

### Delete Address
- **DELETE** `/api/v1/users/addresses/:id`
- **Auth:** Required

### Set Default Address
- **PUT** `/api/v1/users/addresses/:id/default`
- **Auth:** Required

## Authentication Details

### JWT Token Format
- Access Token expires in: 7 days (configurable)
- Refresh Token expires in: 7 days
- Header: `Authorization: Bearer <accessToken>`

### Password Requirements
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number
- Must contain special character (@$!%*?&)

### Response Format
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": { /* response data */ },
  "timestamp": "2026-07-15T21:00:00Z"
}
```

### Error Responses
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict (email already exists)
- 500: Internal Server Error

## Database Models

### User
- id, email, password, firstName, lastName, phone, status, createdAt, updatedAt, deletedAt

### UserPreference
- id, userId, language, theme, emailNotifications

### RefreshToken
- id, userId, token, expiresAt, revokedAt

### PasswordResetToken
- id, userId, token, expiresAt, usedAt

### EmailVerificationToken
- id, userId, token, expiresAt, verifiedAt

### Address
- id, userId, type (BILLING/SHIPPING), fullName, phone, address, city, state, zipCode, country, isDefault

### Role & Permission
- User can have multiple roles
- Roles have permissions (resource:action)

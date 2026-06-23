# Jersey Flair Backend

Backend API for Jersey Flair - Premium Football Jerseys Store.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Neon (PostgreSQL) with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Validation**: Zod

## Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files (database, env)
│   ├── controllers/     # Request handlers
│   ├── middlewares/     # Express middlewares (auth, validation, error handling)
│   ├── routes/          # API route definitions
│   ├── schemas/         # Zod validation schemas
│   ├── services/        # Business logic layer
│   ├── utils/           # Utility functions (JWT, password hashing)
│   └── server.ts        # Main application entry point
├── prisma/
│   └── schema.prisma    # Prisma schema definition
├── package.json
├── tsconfig.json
└── .env.example
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Configure your `.env` file with your Neon database connection string:
```
DATABASE_URL=postgresql://neondb_owner:npg_IcgHVpt39fmP@ep-sparkling-lab-atpkxfmj-pooler.c-9.us-east-1.aws.neon.tech/neondb?sslmode=require
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run database migrations:
```bash
npx prisma migrate dev --name init
```

This will create the tables in your Neon database based on the Prisma schema.

## Running the Server

Development mode (with hot reload):
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (GUI for database)
- `npm run prisma:seed` - Seed database with initial data

## API Endpoints

### Public Routes

#### Products
- `GET /api/products` - List all products (supports query params: category, type, size, search, sort_by)
- `GET /api/products/:id` - Get product by ID

#### Coupons
- `POST /api/coupons/validate` - Validate a coupon code

### Admin Routes (Requires Authentication)

#### Authentication
- `POST /api/admin/login` - Login and get JWT token

#### Products (Protected)
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

#### Coupons (Protected)
- `POST /api/coupons` - Create a new coupon
- `DELETE /api/coupons/:id` - Delete a coupon
- `GET /api/coupons` - List all coupons

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Database Schema

### Products Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `description` (TEXT)
- `price` (DECIMAL)
- `promotional_price` (DECIMAL, nullable)
- `image_url` (TEXT)
- `category` (VARCHAR)
- `type` (VARCHAR)
- `sizes` (TEXT[])
- `is_featured` (BOOLEAN)
- `created_at` (TIMESTAMP)

### Coupons Table
- `id` (UUID, Primary Key)
- `code` (VARCHAR, unique)
- `discount_type` ('percentage' or 'fixed')
- `discount_value` (DECIMAL)
- `active` (BOOLEAN)
- `created_at` (TIMESTAMP)

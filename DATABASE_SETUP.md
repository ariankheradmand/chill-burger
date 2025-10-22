# Database Setup Guide

This project now uses Prisma ORM with SQLite database.

## Initial Setup

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npx prisma generate
```

3. Run migrations:
```bash
npx prisma migrate dev
```

4. Seed the database with initial data:
```bash
npx prisma db seed
```

## Database Management

### View Database in Prisma Studio
```bash
npx prisma studio
```

### Reset Database
```bash
npx prisma migrate reset
```

### Create New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

## Database Schema

### Category Model
- id: Auto-increment integer
- header: Category name (e.g., "پیش‌غذاها")
- imgsrc: Image path
- colorScheme: CSS color variable
- order: Display order
- items: Related items

### Item Model
- id: Auto-increment integer
- name: Item name
- price: Price string
- taste: Taste description
- ingredients: JSON array of ingredients
- allergyWarning: Allergy information
- disabled: Boolean flag
- categoryId: Foreign key to Category

## API Endpoints

### GET /api/items
Returns all categories with their items in the original format.

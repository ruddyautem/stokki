# 📦 Stokki

A modern inventory management web application — track, analyze, and anticipate your stock levels with ease.

## Features

- **Dashboard** — Overview of total products, inventory value, low-stock alerts, weekly product trends (area chart), and real-time stock-level breakdowns (donut chart).
- **Inventory** — Searchable, paginated product table with bulk selection and deletion. Responsive card layout on mobile.
- **Add Product** — Form to create new products with name, quantity, price, optional SKU, and customizable low-stock threshold.
- **Settings** — Account management powered by [Stack Auth](https://stack-auth.com).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database ORM | Prisma |
| Authentication | Stack Auth |
| Charts | Recharts |
| Validation | Zod |
| Package Manager / Runtime | Bun |

## Getting Started

```bash
# Install dependencies
bun install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start dev server
bun run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/                      # Next.js App Router pages & layouts
│   └── (authenticated)/      # Protected routes (dashboard, inventory, etc.)
├── components/               # Reusable UI components
├── hooks/                    # Custom React hooks
├── lib/                      # Server utilities (auth, db, server actions)
├── prisma/                   # Database schema & migrations
└── stack/                    # Stack Auth configuration
```

## License

© 2026 Stokki.autem.dev. All rights reserved.

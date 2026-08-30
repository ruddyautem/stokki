# Stokki

<div align="center">
**[Français](#francais)** · **[English](#english)**
</div>

---

<a id="francais"></a>
## Français

### 📋 Présentation
Bienvenue sur le code source de **Stokki**. J'avais besoin d'une solution simple, épurée et performante pour la gestion d'inventaire. Stokki est une application conçue pour les petites entreprises et les indépendants qui veulent garder un œil sur leur stock sans se perdre dans des interfaces compliquées. L'expérience utilisateur est pensée pour être rapide, minimaliste et "pro", avec des statistiques en temps réel et une gestion centralisée de vos produits.

### 📑 Les pages

| Route | Ce qu'on y trouve |
| --- | --- |
| `/` (Accueil) | Une landing page avec un héro clair, et un aperçu grandeur nature (skeleton) du tableau de bord. |
| `/sign-in` | Page d'authentification personnalisée et sécurisée via Stack Auth (inclut un accès direct via un compte de test). |
| `/dashboard` | Le tableau de bord principal. Statistiques clés, produits en rupture de stock, graphique des entrées/sorties (via Recharts). |
| `/inventory` | L'inventaire complet de vos produits, avec pagination et gestion de l'état des stocks. |
| `/add-product` | Un formulaire pour ajouter un nouveau produit à votre inventaire. |
| `/settings` | Gestion de votre profil et des paramètres de l'application. |

### 🛠 Stack technique

| Catégorie | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 (React Compiler) |
| Langage | TypeScript |
| Package manager | Bun |
| Styling | Tailwind CSS v4 |
| Base de données | Prisma ORM |
| Authentification | Stack Auth |
| Icônes & UI | Lucide React, Recharts |
| Notifications | React Toastify |
| Validation | Zod |
| Qualité de code | Biome |

### 📁 Structure du projet
```
stokki/
├── app/
│   ├── (authenticated)/         # Routes protégées (Dashboard, Inventory...)
│   │   ├── dashboard/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── add-product/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx           # Layout avec Sidebar et Footer
│   ├── handler/                 # Routes de callback Stack Auth
│   ├── sign-in/                 # Page de connexion personnalisée
│   ├── globals.css              # Styles globaux + Tailwind v4
│   ├── layout.tsx               # Layout racine + StackProvider
│   └── page.tsx                 # Landing page
├── components/                  # Composants UI réutilisables
│   ├── Footer.tsx
│   ├── HeroDashboardSkeleton.tsx# Aperçu de l'app sur l'accueil
│   ├── Pagination.tsx
│   ├── ProductsChart.tsx        # Graphique Recharts
│   └── Sidebar.tsx              # Menu de navigation latéral
├── hooks/
│   └── useBodyScrollLock.ts     # Bloque le scroll mobile si menu ouvert
├── lib/
│   └── ...                      # Utilitaires (Prisma client, etc.)
├── prisma/
│   └── schema.prisma            # Schéma de base de données
├── stack/
│   └── client.ts                # Configuration Stack Auth
├── bun.lock
├── biome.json                   # Configuration du linter/formateur
├── next.config.ts
├── package.json
└── README.md
```

### 🚀 Pour lancer le projet

```bash
git clone <url-du-repo>
cd stokki
bun install
bunx prisma generate
bun run dev
```
Direction [http://localhost:3000](http://localhost:3000).

> 💡 Vous aurez besoin de variables d'environnement dans un fichier `.env` pour la base de données (Prisma) et Stack Auth.

---

<a id="english"></a>
## English

### 📋 Overview
Welcome to the source code of **Stokki**. I needed a simple, clean, and fast solution for inventory management. Stokki is an application designed for small businesses and freelancers who want to keep an eye on their stock without getting lost in complicated interfaces. The user experience is built to be fast, minimalist, and "pro", featuring real-time statistics and centralized product management.

### 📑 Pages

| Route | What's there |
| --- | --- |
| `/` (Home) | A landing page with a clear hero section, and a full-scale mockup (skeleton) of the dashboard. |
| `/sign-in` | Custom, secure authentication page powered by Stack Auth (includes 1-click test account access). |
| `/dashboard` | The main dashboard. Key metrics, out-of-stock warnings, and an input/output chart (via Recharts). |
| `/inventory` | The complete inventory list with pagination and stock status management. |
| `/add-product` | A form to add a new product to your inventory. |
| `/settings` | Profile and application settings management. |

### 🛠 Tech stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 (React Compiler) |
| Language | TypeScript |
| Package manager | Bun |
| Styling | Tailwind CSS v4 |
| Database | Prisma ORM |
| Authentication| Stack Auth |
| Icons & UI | Lucide React, Recharts |
| Notifications | React Toastify |
| Validation | Zod |
| Code quality | Biome |

### 📁 Project structure
```
stokki/
├── app/
│   ├── (authenticated)/         # Protected routes (Dashboard, Inventory...)
│   │   ├── dashboard/page.tsx
│   │   ├── inventory/page.tsx
│   │   ├── add-product/page.tsx
│   │   ├── settings/page.tsx
│   │   └── layout.tsx           # Layout with Sidebar and Footer
│   ├── handler/                 # Stack Auth callback routes
│   ├── sign-in/                 # Custom login page
│   ├── sign-up/                 # Custom registration page
│   ├── globals.css              # Global styles + Tailwind v4
│   ├── layout.tsx               # Root layout + StackProvider
│   └── page.tsx                 # Landing page
├── components/                  # Reusable UI components
│   ├── Footer.tsx
│   ├── HeroDashboardSkeleton.tsx# Full-scale app preview on home
│   ├── Pagination.tsx
│   ├── ProductsChart.tsx        # Recharts graph
│   └── Sidebar.tsx              # Main lateral navigation menu
├── hooks/
│   └── useBodyScrollLock.ts     # Locks mobile scroll when menu is open
├── lib/
│   └── ...                      # Utilities (Prisma client, etc.)
├── prisma/
│   └── schema.prisma            # Database schema
├── stack/
│   └── client.ts                # Stack Auth configuration
├── bun.lock
├── biome.json                   # Linter/formatter configuration
├── next.config.ts
├── package.json
└── README.md
```

### 🚀 Running it locally

```bash
git clone <repo-url>
cd stokki
bun install
bunx prisma generate
bun run dev
```
Then head to [http://localhost:3000](http://localhost:3000).

> 💡 You will need environment variables in a `.env` file for the database (Prisma) and Stack Auth.

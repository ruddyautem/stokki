# Stokki

<div align="center">

**[Français](#francais)** · **[English](#english)**

</div>

---

<a id="francais"></a>
## Français

### 📋 Présentation
J'avais besoin d'une solution simple, épurée et performante pour la gestion d'inventaire — quelque chose que je pourrais ouvrir sur mon téléphone en quelques secondes et qui soit agréable à utiliser au quotidien. Stokki est né de ce besoin.

C'est une application web moderne de gestion d'inventaire pensée pour les petites entreprises, indépendants et commerçants qui souhaitent garder un œil sur leurs stocks sans friction ni complexité inutile.

L'expérience a été spécialement optimisée pour être ultra-rapide, réactive et esthétique, sur desktop comme sur smartphones et tablettes (iPad Pro, écrans larges 3xl).

---

### ✨ Fonctionnalités clés

- 🌐 **Bilingue (Français / English)** — bascule instantanée sans rechargement, mémorisée entre les sessions.
- 🌓 **Mode Sombre & Clair** — bascule instantanée du thème, détection des préférences système et script d'amorçage sans flash blanc.
- 📦 **Gestion des stocks en temps réel** — mise à jour immédiate des quantités, badges d'état (En stock / Stock faible / Rupture), suppression en masse avec confirmation.
- 🔍 **Recherche & tri instantanés** — filtrage par nom ou SKU, tri par nom, quantité ou prix.
- 📊 **Tableau de bord** — KPIs, graphique d'évolution sur 12 semaines, donut chart de répartition, derniers ajouts.
- 📱 **Responsive & mobile-first** — navigation inférieure tactile (`BottomNav`), en-tête mobile dédié (`MobileHeader`) et zéro défilement parasite.
- 🔐 **Authentification** — connexion sécurisée via Stack Auth (Google, GitHub, identifiants), avec accès démo en un clic.

---

### 📑 Les pages

| Route | Description |
| --- | --- |
| `/` (Accueil) | Landing page moderne présentant la solution avec aperçu réaliste du tableau de bord. |
| `/sign-in` | Authentification personnalisée et sécurisée via Stack Auth (avec connexion démo en 1 clic). |
| `/dashboard` | Tableau de bord principal avec statistiques clés, graphiques Recharts et derniers ajouts. |
| `/inventory` | Inventaire complet : recherche live, tri, ajustement direct des quantités, sélection multiple et pagination. |
| `/add-product` | Formulaire d'ajout de référence avec nom, SKU, prix, quantité initiale et seuil de stock faible. |
| `/settings` | Paramètres du compte et préférences utilisateur synchronisés avec la langue choisie. |

---

### 🛠 Stack technique

| Catégorie | Technologies |
| --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack) + React 19 (React Compiler) |
| **Langage** | TypeScript |
| **Package Manager** | Bun |
| **Styling** | Tailwind CSS v4 + Dark mode natif |
| **Base de données** | PostgreSQL via Prisma 7 (`@prisma/adapter-pg` + `pg`) |
| **Authentification** | Stack Auth (intégré avec StackClientProvider dynamique) |
| **Visualisation** | Recharts |
| **Icônes** | Lucide React |
| **Notifications** | Sonner (thématisé clair/sombre avec icônes d'état colorées) |
| **Validation** | Zod |
| **Qualité de code** | Biome |

---

### 📁 Structure du projet

```
stokki/
├── app/
│   ├── (authenticated)/         # Routes protégées (Dashboard, Inventory...)
│   │   ├── dashboard/page.tsx   # Dashboard (Server Component avec sérialisation)
│   │   ├── inventory/page.tsx   # Inventaire (Server Component)
│   │   ├── add-product/page.tsx # Ajout produit
│   │   ├── settings/page.tsx    # Page paramètres
│   │   └── layout.tsx           # Layout avec Sidebar, MobileHeader, BottomNav et Footer
│   ├── handler/                 # Routes de callback Stack Auth
│   ├── sign-in/                 # Page de connexion personnalisée (Google, GitHub, Démo)
│   ├── globals.css              # Styles globaux + Tailwind CSS v4
│   ├── layout.tsx               # Layout racine avec LanguageProvider, ThemeProvider et StackClientProvider
│   └── page.tsx                 # Landing page
├── components/                  # Composants UI
│   ├── BottomNav.tsx            # Navigation inférieure mobile
│   ├── ConfirmModal.tsx         # Modale de confirmation de suppression
│   ├── DashboardClient.tsx      # Vue client interactive du tableau de bord
│   ├── DonutCenter.tsx          # Label central du graphique donut
│   ├── Footer.tsx               # Pied de page
│   ├── HeroDashboardMockup.tsx  # Aperçu interactif sur l'accueil
│   ├── InventoryClient.tsx      # Enveloppe cliente de l'inventaire
│   ├── InventoryTable.tsx       # Tableau & cartes inventaire (recherche, tri, live edit)
│   ├── LanguageToggle.tsx       # Sélecteur bilingue avec drapeaux SVG cross-browser
│   ├── MobileHeader.tsx         # En-tête mobile avec logo, toggles et profil
│   ├── PageLayout.tsx           # Coquille commune desktop/mobile
│   ├── Pagination.tsx           # Composant de pagination
│   ├── PaginationButton.tsx     # Bouton de pagination accessible
│   ├── ProductsChart.tsx        # Graphique Recharts bilingue
│   ├── Sidebar.tsx              # Barre latérale desktop
│   ├── StackClientProvider.tsx  # Fournisseur de langue dynamique pour Stack Auth
│   ├── StatCard.tsx             # Carte statistique
│   ├── StockDonutChart.tsx      # Donut chart de répartition des stocks
│   ├── StockLegendItem.tsx      # Légende du donut chart
│   ├── ThemeToggle.tsx          # Bascule clair/sombre avec persistance
│   └── ThemedToaster.tsx        # Toaster Sonner synchronisé au thème actif
├── context/
│   ├── LanguageContext.tsx      # Contexte React i18n (FR / EN-GB) & dictionnaires
│   └── ThemeContext.tsx         # Contexte React thème (clair / sombre)
├── hooks/
│   └── useBodyScrollLock.ts     # Verrouillage du scroll si besoin
├── lib/
│   ├── auth.ts                  # Récupération de l'utilisateur courant
│   ├── prisma.ts                # Client Prisma 7 singleton avec adaptateur pg
│   └── products.ts              # Actions serveur (CRUD, mise à jour de quantité)
├── prisma/
│   ├── migrations/              # Historique des migrations SQL
│   ├── reseed.ts                # Script de réensemencement des données de démo
│   └── schema.prisma            # Schéma PostgreSQL (Product)
├── stack/
│   ├── client.tsx               # Configuration Stack Auth client
│   └── server.ts                # Configuration Stack Auth serveur
├── biome.json                   # Configuration Biome linter/formateur
├── next.config.ts
├── package.json
└── README.md
```

---

### 🚀 Lancer le projet en local

```bash
git clone <url-du-repo>
cd stokki
bun install
bunx prisma generate
bun run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

> 💡 Assurez-vous d'avoir configuré vos variables d'environnement dans un fichier `.env` (`DATABASE_URL`, clés Stack Auth).

---

<a id="english"></a>
## English

### 📋 Overview
I needed something simple, clean, and fast for inventory management — the kind of app I could pull up on my phone in seconds and actually enjoy using day to day. That's what Stokki is.

It's a modern web application built for small businesses, freelancers, and independent sellers who want clear, real-time stock control without clutter or complex interfaces.

The UX has been specifically crafted to be lightweight, responsive, visually polished, and zero-vertical-scroll across desktop, tablet, and mobile screens.

---

### ✨ Key Features

- 🌐 **Bilingual (French / English)** — instant language switch without page reload, remembered across sessions.
- 🌓 **Full Dark & Light Mode** — instant theme toggle, system preference detection, and flash-free bootstrap script.
- 📦 **Real-time stock management** — immediate quantity updates, status badges (In Stock / Low Stock / Out of Stock), bulk deletion with confirmation.
- 🔍 **Live search & sorting** — filter by name or SKU, sort by name, quantity, or price.
- 📊 **Dashboard** — KPIs, 12-week trend chart, stock distribution donut, recent additions.
- 📱 **Responsive & mobile-first** — ergonomic bottom navigation (`BottomNav`), dedicated mobile header (`MobileHeader`), and zero vertical scroll overflow.
- 🔐 **Authentication** — secure sign-in via Stack Auth (Google, GitHub, credentials), with 1-click demo access.

---

### 📑 Pages

| Route | Description |
| --- | --- |
| `/` (Home) | Modern landing page introducing Stokki with a dynamic dashboard mockup. |
| `/sign-in` | Secure, custom authentication page via Stack Auth (includes 1-click test credentials). |
| `/dashboard` | Main dashboard displaying metrics, Recharts trends, and recent products. |
| `/inventory` | Full inventory table with live search, sorting, direct quantity editing, and pagination. |
| `/add-product` | Add product form (name, SKU, price, initial quantity, low-stock threshold). |
| `/settings` | Profile and account settings synced dynamically with the selected language. |

---

### 🛠 Tech Stack

| Category | Technologies |
| --- | --- |
| **Framework** | Next.js 16 (App Router, Turbopack) + React 19 (React Compiler) |
| **Language** | TypeScript |
| **Package Manager** | Bun |
| **Styling** | Tailwind CSS v4 + Native Dark Mode |
| **Database** | PostgreSQL via Prisma 7 (`@prisma/adapter-pg` + `pg`) |
| **Authentication** | Stack Auth (via custom dynamic StackClientProvider) |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Notifications** | Sonner (themed light/dark with colored status icons) |
| **Validation** | Zod |
| **Code Quality** | Biome |

---

### 📁 Project Structure

```
stokki/
├── app/
│   ├── (authenticated)/         # Protected routes (Dashboard, Inventory…)
│   │   ├── dashboard/page.tsx   # Dashboard (Server Component with serialisation)
│   │   ├── inventory/page.tsx   # Inventory (Server Component)
│   │   ├── add-product/page.tsx # Add product form
│   │   ├── settings/page.tsx    # Settings page
│   │   └── layout.tsx           # Layout with Sidebar, MobileHeader, BottomNav and Footer
│   ├── handler/                 # Stack Auth callback routes
│   ├── sign-in/                 # Custom sign-in page (Google, GitHub, Demo)
│   ├── globals.css              # Global styles + Tailwind CSS v4
│   ├── layout.tsx               # Root layout with LanguageProvider, ThemeProvider and StackClientProvider
│   └── page.tsx                 # Landing page
├── components/                  # UI components
│   ├── BottomNav.tsx            # Mobile bottom navigation
│   ├── ConfirmModal.tsx         # Deletion confirmation modal
│   ├── DashboardClient.tsx      # Interactive dashboard client view
│   ├── DonutCenter.tsx          # Donut chart centre label
│   ├── Footer.tsx               # Footer
│   ├── HeroDashboardMockup.tsx  # Dashboard preview on the landing page
│   ├── InventoryClient.tsx      # Inventory client wrapper
│   ├── InventoryTable.tsx       # Inventory table & cards (search, sort, live edit)
│   ├── LanguageToggle.tsx       # Bilingual toggle with cross-browser SVG flags
│   ├── MobileHeader.tsx         # Mobile header with logo, toggles and profile
│   ├── PageLayout.tsx           # Shared desktop/mobile shell
│   ├── Pagination.tsx           # Pagination component
│   ├── PaginationButton.tsx     # Accessible pagination button
│   ├── ProductsChart.tsx        # Bilingual Recharts chart
│   ├── Sidebar.tsx              # Desktop sidebar
│   ├── StackClientProvider.tsx  # Dynamic language provider for Stack Auth
│   ├── StatCard.tsx             # Stat card
│   ├── StockDonutChart.tsx      # Stock distribution donut chart
│   ├── StockLegendItem.tsx      # Donut chart legend item
│   ├── ThemeToggle.tsx          # Light/dark theme toggle with persistence
│   └── ThemedToaster.tsx        # Theme-synced Sonner toaster
├── context/
│   ├── LanguageContext.tsx      # React i18n context (FR / EN-GB) & dictionaries
│   └── ThemeContext.tsx         # React theme context (light / dark)
├── hooks/
│   └── useBodyScrollLock.ts     # Scroll lock hook
├── lib/
│   ├── auth.ts                  # Current user helper
│   ├── prisma.ts                # Prisma 7 singleton client with pg adapter
│   └── products.ts              # Server actions (CRUD, live quantity updates)
├── prisma/
│   ├── migrations/              # SQL migration history
│   ├── reseed.ts                # Demo data reseed script
│   └── schema.prisma            # PostgreSQL schema (Product)
├── stack/
│   ├── client.tsx               # Stack Auth client configuration
│   └── server.ts                # Stack Auth server configuration
├── biome.json                   # Biome linter/formatter configuration
├── next.config.ts
├── package.json
└── README.md
```

---

### 🚀 Running Locally

```bash
git clone <repo-url>
cd stokki
bun install
bunx prisma generate
bun run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

> 💡 Ensure your `.env` contains your PostgreSQL connection string (`DATABASE_URL`) and Stack Auth credentials.

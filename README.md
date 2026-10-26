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
| **Base de données** | PostgreSQL via Prisma ORM 8 (contrat et client) |
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
│   ├── prisma.ts                # Client PostgreSQL Prisma ORM 8
│   └── products.ts              # Actions serveur (CRUD, mise à jour de quantité)
├── migrations/
│   ├── app/refs/db.json         # Référence du contrat signé
│   └── snapshots/              # Snapshot du contrat signé
├── prisma/
│   └── reseed.ts                # Script de réensemencement des données de démo
├── prisma8/
│   └── contract.prisma          # Contrat PostgreSQL Prisma ORM 8 (Product)
├── stack/
│   ├── client.tsx               # Configuration Stack Auth client
│   └── server.tsx               # Configuration Stack Auth serveur
├── biome.json                   # Configuration Biome linter/formateur
├── prisma.config.ts             # Configuration du contrat Prisma ORM 8
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
bun run dev
```

Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

> 💡 Assurez-vous d'avoir configuré vos variables d'environnement dans un fichier `.env` (`DATABASE_URL`, clés Stack Auth).

`bun install` et `bun run build` émettent le contrat Prisma ORM 8. Le projet ne dépend plus de Prisma 7. Le contrat natif conserve les mêmes empreintes de stockage et d'exécution que le schéma précédent ; aucune modification de table n'est nécessaire pour cette mise à jour du code.

**Base Neon existante :** `bun prisma db sign` a été exécuté avec succès ; son marqueur et le ref `db` pointent vers le contrat `c75d1e64…`. `bun prisma migration status` a ensuite indiqué « No migrations found ». Le snapshot et le ref générés dans `migrations/` doivent être versionnés avec le contrat. Revérifiez l'état avant toute nouvelle migration. Pour un changement de schéma ultérieur, utilisez `bun prisma contract emit`, `bun prisma migration plan --name <nom>` puis, après revue du plan, `bun prisma db migrate --advance-ref db`. Toute autre base (staging, preview, etc.) doit être vérifiée et signée séparément avant sa première migration Prisma 8. Voir le [guide officiel de migration](https://www.prisma.io/docs/guides/upgrade-prisma-orm/postgresql). Prisma ORM 8 est encore une version candidate.

### 🔄 Rotation des produits de démonstration

`prisma/reseed.ts` conserve le comportement voulu : il tire un nombre de 3 à 12, supprime jusqu'à ce nombre de produits existants du compte démo, puis crée exactement ce nombre de nouveaux produits issus du catalogue. Si le compte n'a aucun produit, il ne crée rien ; s'il en a moins que le nombre tiré, le total augmente. Le script exige `DATABASE_URL` et `DEMO_USER_ID` dans l'environnement et peut être lancé avec `bun prisma/reseed.ts`. Il **modifie la base visée** : vérifiez la connexion et l'identifiant du compte avant de le lancer, notamment depuis un cron sur le VPS. La configuration de ce cron n'est pas dans ce dépôt et n'a pas été vérifiée ici.

### ✅ Vérifications

Lancez `bun run lint`, `bun x tsc --noEmit` et `bun run build` avant déploiement. Le dépôt n'a pas encore de suite de tests automatisés dédiée aux fonctionnalités.

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
| **Database** | PostgreSQL via Prisma ORM 8 (contract and client) |
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
│   ├── prisma.ts                # Prisma ORM 8 PostgreSQL client
│   └── products.ts              # Server actions (CRUD, live quantity updates)
├── migrations/
│   ├── app/refs/db.json         # Signed contract reference
│   └── snapshots/              # Signed contract snapshot
├── prisma/
│   └── reseed.ts                # Demo data reseed script
├── prisma8/
│   └── contract.prisma          # Prisma ORM 8 PostgreSQL contract (Product)
├── stack/
│   ├── client.tsx               # Stack Auth client configuration
│   └── server.tsx               # Stack Auth server configuration
├── biome.json                   # Biome linter/formatter configuration
├── prisma.config.ts             # Prisma ORM 8 contract configuration
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
bun run dev
```

Then visit [http://localhost:3000](http://localhost:3000).

> 💡 Ensure your `.env` contains your PostgreSQL connection string (`DATABASE_URL`) and Stack Auth credentials.

`bun install` and `bun run build` emit the Prisma ORM 8 contract. The project no longer depends on Prisma 7. The native contract has the same storage and execution hashes as the previous schema, so this code update does not require a table change.

**Existing Neon database:** `bun prisma db sign` completed successfully; its marker and the `db` ref point to contract `c75d1e64…`. `bun prisma migration status` then reported “No migrations found.” Commit the generated snapshot and ref in `migrations/` alongside the contract. Recheck the status before any new migration. For later schema changes, run `bun prisma contract emit`, `bun prisma migration plan --name <name>`, then review the plan before `bun prisma db migrate --advance-ref db`. Verify and sign any other database (staging, preview, etc.) separately before its first Prisma 8 migration. See the [official migration guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/postgresql). Prisma ORM 8 is still a release candidate.

### 🔄 Demo product rotation

`prisma/reseed.ts` preserves the intended behavior: it picks a number from 3 to 12, deletes up to that many existing demo-account products, then inserts exactly that many new products from the catalogue. If the account has no products, it does nothing; if it has fewer than the chosen number, the total grows. Set `DATABASE_URL` and `DEMO_USER_ID` in the environment, then run `bun prisma/reseed.ts`. This **writes to the selected database**: verify the connection and demo user ID first, especially when running it from a VPS cron. The cron configuration is not in this repository and has not been verified here.

### ✅ Checks

Run `bun run lint`, `bun x tsc --noEmit`, and `bun run build` before deployment. The repository does not yet contain a dedicated automated feature-test suite.


## Correctifs d’inventaire et migration

Les ajustements +/- utilisent un compare-and-set avec nouvelle tentative ; une édition directe porte la quantité attendue et refuse un conflit. La règle commune est : zéro = rupture ; de 1 au seuil inclus = faible ; au-dessus = disponible. Le seuil par défaut est 5, un seuil explicite de 0 est respecté. Recherche, tri et pagination interrogent maintenant la base par pages bornées, et le graphique agrège les 12 semaines visibles en UTC.

Le contrat prévoit l’unicité (userId, sku), avec migration hors ligne dans migrations/app/20261026T1856_user_scoped_skus. La migration remplace uniquement l’index, sans suppression de produits. Une baseline et les snapshots sont également fournis pour une base neuve. **Aucune migration distante n’a été exécutée.** Sur une base existante, vérifier d’abord le marqueur et le schéma ; ne pas rejouer la baseline de création de tables. Tester le chemin de migration sur une copie sauvegardée avant de lancer prisma db migrate, puis prisma db verify avec la configuration de la bonne base. Le CLI installé et les instructions du skill local décrivent ce workflow Prisma 8. Ne pas utiliser db reset comme réparation.

Tests : bun run test ; types : bunx tsc --noEmit ; build : bun run build (réémet le contrat avant Next). Les tests de concurrence simulent la base ; la validation PostgreSQL réelle et le plan de migration restent à effectuer en staging.

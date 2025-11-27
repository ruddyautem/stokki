import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

const demoUserId = process.env.DEMO_USER_ID;

// --- Pool of French items (same list you used) ---
const ITEMS_POOL = [
  "Chaussettes",
  "Pantalons",
  "Casquettes",
  "Pinceaux",
  "Brosses à cheveux",
  "Chaussures",
  "Dentifrices",
  "Brosses à dents",
  "Bains de douche",
  "Shampoings",
  "Savons",
  "Fil dentaire",
  "Gobelets",
  "Gants de toilette",
  "Cotons démaquillants",
  "Gels",
  "Laques",
  "Peignes",
  "Miroirs",
  "Rouges à lèvres",
  "Blush",
  "Bandeaux",
  "Serviettes",
  "Tapis",
  "Crèmes",
  "T-shirts",
  "Pulls",
  "Vestes",
  "Shorts",
  "Chaussons",
  "Bonnets",
  "Écharpes",
  "Gants",
  "Montres",
  "Ceintures",
  "Sacs à dos",
  "Portefeuilles",
  "Carnets",
  "Stylos",
  "Crayons",
  "Trombones",
  "Agendas",
  "Gommes",
  "Pochettes",
  "Feutres",
  "Colles",
  "Ciseaux",
  "Assiettes",
  "Fourchettes",
  "Couteaux",
  "Cuillères",
  "Bols",
  "Tasses",
  "Verres",
  "Torchons",
  "Éponges",
  "Planche à découper",
  "Oreillers",
  "Couettes",
  "Housses",
  "Draps",
  "Rideaux",
  "Coussins",
  "Lampes",
  "Bougies",
  "Horloges",
  "Paniers",
  "Organisateurs",
  "Déodorants",
  "Lingettes",
  "Crèmes hydratantes",
  "Laits corporels",
  "Démaquillants",
  "Serums",
  "Masques pour le visage",
  "Parfums",
  "Câbles USB",
  "Chargeurs",
  "Batteries externes",
  "Coques de téléphone",
  "Écouteurs",
  "Haut-parleurs",
  "Souris",
  "Claviers",
  "Tapis de souris",
  "Spaghettis",
  "Riz",
  "Pâtes",
  "Biscuits",
  "Chips",
  "Céréales",
  "Compotes",
  "Conserves",
  "Sauces",
  "Farine",
  "Sucre",
  "Sel",
  "Balais",
  "Pelles",
  "Seaux",
  "Éponges de sol",
  "Vaporisateurs",
  "Désinfectants",
  "Nettoyants vitres",
  "Lingettes ménagères",
];

// Shuffle helper
const shuffle = <T>(array: T[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const main = async () => {
  // 1. Get all current demo products
  const existing = await prisma.product.findMany({
    where: { userId: demoUserId },
    select: { id: true },
  });

  if (existing.length === 0) {
    console.log("No items found for the demo user — nothing to rotate.");
    return;
  }

  // Random number of items to rotate this week
  const rotateCount = Math.max(3, Math.floor(Math.random() * 12)); // 3–12

  const toDelete = shuffle(existing).slice(0, rotateCount);

  // 2. Delete X items
  await prisma.product.deleteMany({
    where: {
      id: { in: toDelete.map((p) => p.id) },
    },
  });

  // 3. Add the same number of new items
  const newItems = shuffle(ITEMS_POOL).slice(0, rotateCount);

  await prisma.product.createMany({
    data: newItems.map((name) => ({
      userId: demoUserId,
      name,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
    })),
  });

  console.log(
    `✔ Rotated ${rotateCount} products for demo user ${demoUserId} (deleted ${rotateCount}, added ${rotateCount})`
  );
};

main()
  .catch((e) => console.error(e))
  .finally(async () => prisma.$disconnect());

import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

const demoUserId = process.env.DEMO_USER_ID;

if (!demoUserId) {
  throw new Error("DEMO_USER_ID environment variable is not set");
}

// --- Pool of French items ---
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

// ✅ Generate quantity with 15-20% chance of being 0
const generateQuantity = () => {
  // 17.5% chance of quantity = 0 (average of 15-20%)
  if (Math.random() < 0.175) {
    return 0;
  }
  // 82.5% chance of quantity = 1-20
  return Math.floor(Math.random() * 20) + 1;
};

const main = async () => {
  // 1️⃣ Get existing demo products
  const existing = await prisma.product.findMany({
    where: { userId: demoUserId },
    select: { id: true },
  });

  if (existing.length === 0) {
    console.log("No items found for the demo user — nothing to rotate.");
    return;
  }

  // Random number of items to rotate (3–12)
  const rotateCount = Math.max(3, Math.floor(Math.random() * 10 + 3));

  const toDelete = shuffle(existing).slice(0, rotateCount);

  // 2️⃣ Delete selected items
  await prisma.product.deleteMany({
    where: { id: { in: toDelete.map((p) => p.id) } },
  });

  // 3️⃣ Add new items from pool
  const newItems = shuffle(ITEMS_POOL).slice(0, rotateCount);

  const productsToCreate = newItems.map((name) => {
    const quantity = generateQuantity(); // ✅ Use new function
    return {
      userId: demoUserId,
      name,
      price: Number((Math.random() * 90 + 10).toFixed(2)),
      quantity,
      lowStockAt: 5,
    };
  });

  await prisma.product.createMany({
    data: productsToCreate,
  });

  // ✅ Log statistics
  const zeroQty = productsToCreate.filter((p) => p.quantity === 0).length;
  const nonZeroQty = productsToCreate.length - zeroQty;
  const percentage = ((zeroQty / productsToCreate.length) * 100).toFixed(1);

  console.log(`✔ Rotated ${rotateCount} products for demo user ${demoUserId}`);
  console.log(
    `  - ${zeroQty} items with quantity 0 (${percentage}% out of stock)`
  );
  console.log(`  - ${nonZeroQty} items with quantity 1-20`);
};

main()
  .catch((e) => console.error("❌ Error during rotation:", e))
  .finally(async () => prisma.$disconnect());

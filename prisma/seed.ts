import { PrismaClient } from "@/app/generated/prisma/client";

const prisma = new PrismaClient();

const demoUserId = "44b3961d-34fd-4056-b307-4cff69e82d58"; // <-- replace with your UUID

// Pool of ~100 French product names
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
  // 1. Delete old 25 items for this user
  await prisma.product.deleteMany({
    where: { userId: demoUserId },
  });

  // 2. Pick 25 random items from the 100+
  const randomItems = shuffle(ITEMS_POOL).slice(0, 25);

  // 3. Insert the 25 new products
  await prisma.product.createMany({
    data: randomItems.map((name, i) => ({
      userId: demoUserId,
      name,
      price: (Math.random() * 90 + 10).toFixed(2),
      quantity: Math.floor(Math.random() * 20),
      lowStockAt: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 2)),
    })),
  });

  console.log(`✔ Seed complete: 25 new items inserted for user ${demoUserId}`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

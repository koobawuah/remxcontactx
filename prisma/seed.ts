import { contacts } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData: Omit<contacts, "id">[] = [
  {
    firstName: "Alfred",
    lastName: "Pennyworth",
    avatar: "https://via.placeholder.com/600/24f355",
    twitter: "https://twitter.com/koobawuah",
    notes: "He will be back for more",
    favorite: false,
    createdAt: new Date(Date.now()),
  },

  {
    firstName: "Amina",
    lastName: "Saudia",
    avatar: "https://via.placeholder.com/600/56a8c2",
    twitter: "https://twitter.com/koobawuah",
    notes: "Northern chef 🤌🏾",
    favorite: true,
    createdAt: new Date(Date.now()),
  },
  {
    firstName: "Kofi",
    lastName: "Asene",
    avatar: "https://via.placeholder.com/600/b0f7cc",
    twitter: "https://twitter.com/koobawuah",
    notes: "From Diop, France",
    favorite: false,
    createdAt: new Date(Date.now()),
  },
  {
    firstName: "Alfonzo",
    lastName: "German",
    avatar: "https://via.placeholder.com/600/810b14",
    twitter: "https://twitter.com/koobawuah",
    notes: "",
    favorite: false,
    createdAt: new Date(Date.now()),
  },
];

async function seed() {
  await prisma.contacts.createMany({
    data: seedData,
  });
}

seed().then(async () => {
  await prisma.$disconnect();
});

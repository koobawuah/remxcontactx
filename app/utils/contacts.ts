import prisma from "./prismacl.server";
import type { contacts } from "@prisma/client";

export async function getContacts() {
  const contacts = await prisma.contacts.findMany();

  return contacts;
}

export async function getContact(id: string) {
  return await prisma.contacts.findFirst({
    where: {
      id: id,
    },
  });
}

export async function createContact(
  contactDetails: Omit<contacts, "id" | "favorite" | "createdAt">
) {
  return await prisma.contacts.create({
    data: contactDetails,
  });
}

export async function updateContact(
  id: string,
  updatedContactDetails: contacts
) {
  return await prisma.contacts.update({
    where: { id: id },
    data: updatedContactDetails,
  });
}

export async function deleteContact(id: string) {
  return await prisma.contacts.delete({
    where: { id: id },
  });
}

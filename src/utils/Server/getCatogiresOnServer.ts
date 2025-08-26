"use server";

import { prisma } from "@/lib/prisma";

export interface ICato {
  id: string;
  name: string;
  desdescription: string;
}

export async function ShowAllCatogeries(): Promise<ICato[]> {
  try {
    const data = await prisma.category.findMany();

    const newData = data.map((d) => {
      return { id: d.id, name: d.name, desdescription: d.description };
    });
    return newData;
  } catch  {
    return [{ id: "", name: "", desdescription: "" }];
  }
}

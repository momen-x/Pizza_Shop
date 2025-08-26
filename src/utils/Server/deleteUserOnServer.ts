"use server";

import { prisma } from "@/lib/prisma";
import { deleteAcountDto } from "../validation";
import bcrypt from "bcryptjs";
import { tokenName } from "../tokenName";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

interface returnData {
  success: boolean;
  message: string;
}
export const deleteAcount = async (
  password: string,
  id: string
): Promise<returnData> => {
  try {
    const exsistUser = await prisma.user.findUnique({ where: { id: id } });
    if (!exsistUser) {
      return {
        success: false,
        message: "this account not exist",
      };
    }
    
    const validation = deleteAcountDto.safeParse({ password: password });
    if (!validation.success) {
      return {
        success: false,
        message: "invalied data",
      };
    }

    const isMatchPassword = await bcrypt.compare(password, exsistUser.password);
    if (!isMatchPassword) {
      return { success: false, message: "the password is wrong" };
    }

    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    const cookieStore = await cookies();
    cookieStore.delete(tokenName);
    revalidatePath("/Admin/user");
    // This will redirect from the server side
    return { success: true, message: "the account deleted" };
  } catch {
    return { success: false, message: "Un expected error" };
  }
};

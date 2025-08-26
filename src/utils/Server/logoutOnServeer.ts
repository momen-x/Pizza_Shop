"use server";

import { cookies } from "next/headers";
import { tokenName } from "@/utils/tokenName";
import { redirect } from "next/navigation";

export async function logout() {
  try {
    const cookieStore = await cookies();
    
    // Delete the authentication cookie
    cookieStore.delete(tokenName);

    return { success: true };
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to logout" };
  }
}

// Alternative: If you want to redirect from server action
export async function logoutAndRedirect() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(tokenName);
    
    // This will redirect from the server side
    redirect('/login');
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}
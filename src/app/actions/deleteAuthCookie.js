"use server";
import { cookies } from "next/headers";

export async function deleteCookies() {
  const cookieName = process.env.NEXT_APS_COOKIE;

  if (!cookieName) {
    return { success: false };
  }

  try {
    const cookieStore = await cookies();

    // Vérifier si le cookie existe avant de le supprimer
    const existingCookie = cookieStore.get(cookieName);

    if (existingCookie) {
      cookieStore.delete(cookieName);

      return { success: true };
    } else {
      return { success: true };
    }
  } catch (error) {
    return {
      success: false,
      details: error.message,
    };
  }
}

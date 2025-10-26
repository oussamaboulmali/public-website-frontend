"use server";

import { cookies } from "next/headers";

export async function saveAuthCookie(formData) {
  try {
    for (const [name, value] of formData.entries()) {
      if (typeof value === "string") {
        const cookiesValue = await cookies();
        cookiesValue?.set(name, decodeURIComponent(value));
      }
    }
    return { success: true };
  } catch (err) {
    //console.error("Erreur lors de l'enregistrement des cookies :", err);
  }
}

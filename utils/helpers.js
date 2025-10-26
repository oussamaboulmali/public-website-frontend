"use server";
import { cookies } from "next/headers";

export async function storeCookiesFromResponse(response) {
  const setCookieHeader = response.headers.get("set-cookie");
  if (setCookieHeader) {
    const cookieValueMatch = setCookieHeader.match(/^[^=]+=([^;]*)/);
    if (cookieValueMatch && cookieValueMatch[1]) {
      return cookieValueMatch[1];
    }
  }
  return null;
}

export async function injectStoredCookiesIntoHeaders(headers, cookiesName) {
  const allCookies = await cookies();
  const sessionCookie = allCookies?.get(cookiesName);
  if (sessionCookie?.value) {
    headers["Cookie"] = cookiesName + `=${sessionCookie.value}`;
  }
}

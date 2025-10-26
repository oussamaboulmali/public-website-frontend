"use server";
import { headers } from "next/headers";
export async function fetchData(
  url,
  method = "GET",
  body = null,
  isClient = false,
  isNoHeaders = false,
  cookies
) {
  const test = await headers();
  const ip =
    test?.get("x-forwarded-for")?.split(",")[0] ??
    test?.get("x-real-ip") ??
    null;

  const options = {
    method,
  };

  options.next = {
    cache: "no-store",
  };

  const headerss = {
    "x-client-ip": ip,
    "Accept-Encoding": "gzip, deflate, br",
  };

  if (!isNoHeaders) {
    headerss["Content-Type"] = "application/json";
  }

  if (cookies) {
    headerss["Cookie"] = `${process.env.NEXT_APS_COOKIE}=${cookies ?? ""}`;
  }
  options.headers = headerss;

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  options.credentials = "include";

  try {
    const response = await fetch(url, options);
    const status = response.status;

    let data = null;
    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok) {
      return {
        data,
        status,
        error: data?.message || "Erreur lors du fetch des données.",
      };
    }

    return { data, status, error: null };
  } catch (error) {
    return { data: null, status: null, error: error.message };
  }
}

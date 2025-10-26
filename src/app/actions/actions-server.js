"use server";

import {
  injectStoredCookiesIntoHeaders,
  storeCookiesFromResponse,
} from "../../../utils/helpers";
import { headers } from "next/headers";

function createApiAction(
  endpoint,
  allowedFields,
  httpMethod = "POST",
  options = {},
  castTypes = {},
  hooks = {}
) {
  return async function apiServerAction(prevState, formData) {
    const test = await headers();
    const ip =
      test?.get("x-forwarded-for")?.split(",")[0] ??
      test?.get("x-real-ip") ??
      null;

    const baseUrl = process.env.NEXT_BASE_URL;
    const cookieName = process.env.NEXT_APS_COOKIE;
    const method = httpMethod;
    const body = {};

    for (const field of allowedFields) {
      const value = formData.get(field);
      if (value !== null && value !== undefined) {
        if (castTypes[field] === "number") {
          const casted = Number(value);
          if (!isNaN(casted)) {
            body[field] = casted;
          }
        } else {
          body[field] = value;
        }
      }
    }

    const headerss = {
      "Content-Type": "application/json",
      "x-client-ip": ip,
      "Accept-Encoding": "gzip, deflate, br",
    };

    if (hooks.beforeRequest) {
      await hooks.beforeRequest(headerss, cookieName);
    }

    const fetchOptions = {
      method,
      //credentials: "include",
      cache: "no-store",
      headers: headerss,
      ...(body && Object.keys(body).length > 0
        ? { body: JSON.stringify(body) }
        : {}),
      
      ...options,
    };

    try {
      const response = await fetch(`${baseUrl}${endpoint}`, fetchOptions);
      const status = response.status;
      const data = await response.json().catch(() => null);

      let storedCookies = "";

      if (hooks.afterResponse) {
        storedCookies = (await hooks.afterResponse(response)) || "";
      }

      const result = {
        status,
        error: null,
        data,
      };
      if (!response.ok) {
        result.error = data?.message || "Erreur serveur";
        result.data = null;
        if (typeof data?.isBlocked !== "undefined") {
          result.isBlocked = data.isBlocked;
        }
        //throw error;
      }

      // Ajout conditionnel du champ cookies uniquement s'il est non vide ---recuperer via otpAction---
      if (storedCookies) {
        result["cookies"] = storedCookies;
      }

      return result;
    } catch (error) {
      return {
        status: null,
        error: error.message,
        data: null,
      };
    }
  };
}

export const loginAction = createApiAction(
  "auth/login",
  ["email", "password"],
  "POST",
  {},
  { email: "String", password: "String" }
);

export const loginOTPAction = createApiAction(
  "auth/verifiy",
  ["userId", "otpKey"],
  "POST",
  {},
  { userId: "number", otpKey: "number" },
  {
    afterResponse: storeCookiesFromResponse,
  }
);

export const LogoutAction = createApiAction(
  "auth/logout",
  [],
  "POST",
  {},
  {},
  {
    beforeRequest: injectStoredCookiesIntoHeaders,
  }
);
export const paginateArticlesAction = createApiAction(
  "articles",
  ["pageSize", "page", "categorie", "subCategorie"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
    categorie: "string",
    subCategorie: "string",
  },
  {}
);
export const paginateInfographieAction = createApiAction(
  "infographies",
  ["pageSize", "page"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
  },
  {}
);
export const paginateGalerieAction = createApiAction(
  "galleries",
  ["pageSize", "page"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
  },
  {}
);
export const paginateTagsAction = createApiAction(
  "articles/tag",
  ["pageSize", "page", "alias"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
    alias: "string",
  },
  {}
);
export const paginateSearchArchiveAction = createApiAction(
  "archives/search",
  [
    "pageSize",
    "page",
    "searchText",
    "categorie",
    "sortBy",
    "publish_date_start",
    "publish_date_end",
  ],
  "POST",
  {},
  {
    searchText: "string",
    pageSize: "number",
    page: "number",
    categorie: "string",
    sortBy: "string",
    publish_date_start: "string",
    publish_date_end: "string",
  },
  {
    beforeRequest: injectStoredCookiesIntoHeaders,
  }
);
export const paginateSearchAction = createApiAction(
  "articles/search",
  [
    "pageSize",
    "page",
    "searchText",
    "categorie",
    "sortBy",
    "publish_date_start",
    "publish_date_end",
  ],
  "POST",
  {},
  {
    searchText: "string",
    pageSize: "number",
    page: "number",
    categorie: "string",
    sortBy: "string",
    publish_date_start: "string",
    publish_date_end: "string",
  },
  {}
);
export const paginateDossierAction = createApiAction(
  "dossiers",
  ["pageSize", "page"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
  },
  {}
);
export const paginateDossierContentAction = createApiAction(
  "dossiers/detail",
  ["pageSize", "page", "alias"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
    alias: "string",
  },
  {}
);
export const paginateCahierAction = createApiAction(
  "cahiers",
  ["pageSize", "page"],
  "POST",
  {},
  {
    pageSize: "number",
    page: "number",
  },
  {}
);
export const paginateInfoAction = createApiAction("home/info", [], "GET");
export const paginateActualityAction = createApiAction(
  "home/actualites",
  ["categorieId", "subCategorieId"],
  "POST",
  {},
  { categorieId: "number", subCategorieId: "number" },
  {}
);
export const paginateVideoAction = createApiAction(
  "dossiers",
  ["pageSize", "page"],
  "POST",
  {},
  { pageSize: "number", page: "number" },
  {}
);

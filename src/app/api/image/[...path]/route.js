//middleware pour corriger les images
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request, { params }) {
  try {
    const paramss = await params;
    const imagePath = paramss?.path?.join("/");
    const fullPath = path?.join(process.cwd(), "public", "assets", imagePath);

    if (!fs.existsSync(fullPath)) {
      return new NextResponse("Image not found", { status: 404 });
    }

    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    const contentType = getContentType(ext);

    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    //console.error(error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}

function getContentType(ext) {
  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  };
  return types[ext] || "application/octet-stream";
}

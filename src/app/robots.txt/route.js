// app/robots.txt/route.js

export function GET(request) {
  const baseUrl = `${request.nextUrl.protocol}//${request.headers.get("host")}`;

  const robots = `
User-agent: *
Allow: /

Sitemap: ${baseUrl + "/" + process.env.NEXT_LAN}/sitemap.xml
  `.trim();

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

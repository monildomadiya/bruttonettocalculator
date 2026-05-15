import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers full access to calculator & content pages
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/cdn-cgi/",
        ],
      },
      {
        // Give Googlebot explicit unlimited access — signals trust
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        // Allow Bing & Baidu
        userAgent: ["Bingbot", "Baiduspider"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host:    SITE_URL,
  };
}

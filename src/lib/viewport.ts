import type { Viewport } from "next";

/**
 * Global viewport config — exported from layout.tsx
 *
 * width=device-width   → use actual screen width (not 980px desktop default)
 * initial-scale=1      → no zoom on load
 * viewport-fit=cover   → respect iPhone notch / safe areas
 * maximum-scale=1      → prevent iOS auto-zoom on input focus (optional)
 */
export const viewport: Viewport = {
  width:           "device-width",
  initialScale:    1,
  viewportFit:     "cover",
  themeColor:      [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#0f172a" },
  ],
};

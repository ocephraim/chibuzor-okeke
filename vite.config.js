import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // When running under `vercel dev`, Vercel handles /api routing itself.
    // The proxy is only needed for standalone `npm run dev` + separate vercel dev on 3001.
    ...(process.env.VERCEL
      ? {}
      : {
          proxy: {
            "/api": {
              target: "http://localhost:3001",
              changeOrigin: true,
            },
          },
        }),
  },
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       // During local dev: /api/* → Vercel dev server on port 3001
//       // This avoids CORS errors since the request comes from Node, not the browser
//       "/api": {
//         target: "https://api.spotify.com/v1",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/spotify-api/, ""),
//       },
//     },
//   },
// });

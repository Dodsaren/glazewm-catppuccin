import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";

// Valid themes
const VALID_THEMES = ["mocha", "macchiato", "frappe", "latte"] as const;
type Theme = (typeof VALID_THEMES)[number];

// Get theme from environment variable or default to 'mocha'
const theme = (process.env.THEME as Theme).trim() || "mocha";

if (!VALID_THEMES.includes(theme as Theme)) {
  console.error(
    `Invalid theme "${theme}". Valid themes are: ${VALID_THEMES.join(", ")}`,
  );
  process.exit(1);
}

// Plugin to inject theme class into HTML
const injectTheme: Plugin = {
  name: "inject-theme",
  transformIndexHtml(html) {
    return html.replace(/<body>/, `<body class="theme-${theme}">`);
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectTheme],
  base: "./",
  define: {
    "process.env.THEME": JSON.stringify(theme),
  },
});

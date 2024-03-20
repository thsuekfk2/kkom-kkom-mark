import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
import { loadEnv } from "vite";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

const env = loadEnv("staging", process.cwd(), "");

export default defineManifest(async (config) => ({
  manifest_version: 3,
  name: config.mode === "staging" ? "[INTERNAL] Tools - EXE" : "Tools - EXE",
  description: "응용프로그램 EXE App",
  version:
    label === "0"
      ? `${major}.${minor}.${patch}`
      : `${major}.${minor}.${patch}.${label}`,
  version_name: version,
  oauth2: {
    client_id: env.VITE_APP_GOOGLE_CLIENT_KEY,
    scopes: ["openid", "email", "profile"],
  },
  action: {
    default_title: "popup",
    default_popup: "src/pages/popup/index.html",
  },
  icons: {
    "16": "e_image.png",
    "48": "e_image.png",
    "128": "e_image.png",
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
  content_scripts: [
    {
      matches: ["https://*/*", "http://*/*"],
      js: ["src/pages/content/main.tsx"],
    },
  ],
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css"],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage", "scripting", "activeTab", "identity", "storage"],
}));

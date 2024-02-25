import { defineManifest } from "@crxjs/vite-plugin";

import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === "staging" ? "[INTERNAL] Tools - EXE" : "Tools - EXE",
  description: "응용프로그램 EXE App",
  version:
    label === "0"
      ? `${major}.${minor}.${patch}`
      : `${major}.${minor}.${patch}.${label}`,
  version_name: version,
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
  permissions: ["storage", "scripting", "activeTab"],
}));

import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

const [major, minor, patch, label = "0"] = version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async (config) => ({
  manifest_version: 3,
  name:
    config.mode === "staging"
      ? "[INTERNAL] 북마크를 간단하게, 꼼꼼마크"
      : "북마크를 간단하게, 꼼꼼마크",
  description: "오래 기억하고 싶은 URL을 저장하고 관리하세요.",
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
    "16": "kkom.png",
    "48": "kkom.png",
    "128": "kkom.png",
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module",
  },
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css"],
      matches: ["*://*/*"],
    },
  ],
  permissions: ["storage", "scripting", "activeTab", "identity", "storage"],
}));

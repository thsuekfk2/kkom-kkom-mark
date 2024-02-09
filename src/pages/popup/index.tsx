import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

createRoot(document.getElementById("app-container") as HTMLElement).render(
  <Popup />
);

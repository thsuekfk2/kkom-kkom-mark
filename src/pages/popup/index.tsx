import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";
import "../../../global.css";

createRoot(document.getElementById("app-container") as HTMLElement).render(
  <Popup />
);

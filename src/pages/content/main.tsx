import { createRoot } from "react-dom/client";
import App from "./App";

var div = document.createElement("div");
document.body.appendChild(div);
div.id = "content-root";

createRoot(document.getElementById("content-root") as HTMLElement).render(
  <App />
);

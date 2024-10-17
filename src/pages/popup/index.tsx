import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";
import "../../../global.css";
import { ChakraProvider } from "@chakra-ui/react";
import "./popup.css";

createRoot(document.getElementById("app-container") as HTMLElement).render(
  <ChakraProvider>
    <Popup />
  </ChakraProvider>
);

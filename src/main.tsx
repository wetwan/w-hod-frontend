import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import HospitalContextProvider from "./context/HospitalContext.tsx";
import HospitalInfoContextProvider from "./context/HospitalInfo.tsx";
import DoctorContextProvider from "./context/DoctorContext.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <HospitalContextProvider>
          <HospitalInfoContextProvider>
            <DoctorContextProvider>
              <App />
            </DoctorContextProvider>
          </HospitalInfoContextProvider>
        </HospitalContextProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>
);

import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import { router } from "./routes";

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  );
}

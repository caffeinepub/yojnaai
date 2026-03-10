import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { Suspense, lazy } from "react";
import { PageSkeleton } from "./components/LoadingSkeleton";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SchemePage = lazy(() => import("./pages/SchemePage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));

function RootLayout() {
  const { theme } = useTheme();
  return (
    <div
      className="min-h-screen"
      style={{ background: theme === "dark" ? "#0B0F1A" : "#FAFAFA" }}
    >
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Toaster
        theme={theme}
        toastOptions={
          theme === "dark"
            ? {
                style: {
                  background: "rgba(13, 17, 28, 0.95)",
                  border: "1px solid rgba(108, 92, 231, 0.3)",
                  color: "white",
                },
              }
            : {}
        }
      />
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <LandingPage />
    </Suspense>
  ),
});

const schemesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schemes/$category",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryPage />
    </Suspense>
  ),
});

const schemeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scheme/$slug",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <SchemePage />
    </Suspense>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <AdminPage />
    </Suspense>
  ),
});

const sitemapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sitemap.xml",
  component: () => (
    <Suspense fallback={null}>
      <SitemapPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  schemesRoute,
  schemeDetailRoute,
  adminRoute,
  sitemapRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

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
import { ThemeProvider } from "./context/ThemeContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const SchemeDetailPage = lazy(() => import("./pages/SchemeDetailPage"));
const CalculatorPage = lazy(() => import("./pages/CalculatorPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

function RootLayout() {
  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(13, 17, 28, 0.95)",
            border: "1px solid rgba(108, 92, 231, 0.3)",
            color: "white",
          },
        }}
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

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <SearchPage />
    </Suspense>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <CategoriesPage />
    </Suspense>
  ),
});

const schemeDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/scheme/$slug",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <SchemeDetailPage />
    </Suspense>
  ),
});

const calculatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/calculator",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <CalculatorPage />
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

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/schemes/$category",
  component: () => (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  categoriesRoute,
  schemeDetailRoute,
  calculatorRoute,
  adminRoute,
  categoryRoute,
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

import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";

// ── Lazy page imports ──────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const PurchasePage = lazy(() => import("@/pages/PurchasePage"));
const WalletPage = lazy(() => import("@/pages/WalletPage"));
const WalletDepositPage = lazy(() => import("@/pages/WalletDepositPage"));
const DrawPage = lazy(() => import("@/pages/DrawPage"));
const PrizePage = lazy(() => import("@/pages/PrizePage"));
const MapPage = lazy(() => import("@/pages/MapPage"));
const POSPage = lazy(() => import("@/pages/POSPage"));
const CommunityPage = lazy(() => import("@/pages/CommunityPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const HelpPage = lazy(() => import("@/pages/HelpPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const CreateLotteryWizardPage = lazy(
  () => import("@/pages/admin/CreateLotteryWizardPage"),
);

// ── Page loader skeleton ───────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <span className="text-4xl animate-pulse">🍀</span>
        <div className="w-1 h-1 rounded-full bg-primary animate-ping" />
      </div>
    </div>
  );
}

// ── Root route ─────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </Layout>
  ),
});

// ── Routes ─────────────────────────────────────────────────────────────────────
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const seen = localStorage.getItem("lsbfl-onboarding-seen");
    throw redirect({ to: seen ? "/home" : "/onboarding" });
  },
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: () => <OnboardingPage />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: () => <HomePage />,
});

const purchaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/purchase/$lotteryId",
  component: () => <PurchasePage />,
});

const walletDepositRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet/deposit",
  component: () => <WalletDepositPage />,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: () => <WalletPage />,
});

const drawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/draw/$drawId",
  component: () => <DrawPage />,
});

const prizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/prize/$ticketId",
  component: () => <PrizePage />,
});

const mapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/map",
  component: () => <MapPage />,
});

const posRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pos",
  component: () => <POSPage />,
});

const communityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/community",
  component: () => <CommunityPage />,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => <ProfilePage />,
});

const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: () => <HelpPage />,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => <AdminPage />,
});

const adminNewLotteryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/lotteries/new",
  component: () => <CreateLotteryWizardPage />,
});

// ── Router ─────────────────────────────────────────────────────────────────────
const routeTree = rootRoute.addChildren([
  indexRoute,
  onboardingRoute,
  homeRoute,
  purchaseRoute,
  walletDepositRoute,
  walletRoute,
  drawRoute,
  prizeRoute,
  mapRoute,
  posRoute,
  communityRoute,
  profileRoute,
  helpRoute,
  adminRoute,
  adminNewLotteryRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000 } },
});

// ── App ────────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

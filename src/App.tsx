import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { WagmiProvider } from "wagmi";
import { config } from "@/config/wagmi";
import { AppLayout } from "@/components/layout/AppLayout";
import { useAccount } from "wagmi";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Deploy from "./pages/Deploy";
import Monitor from "./pages/Monitor";
import Docs from "./pages/Docs";
import About from "./pages/About";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import ReportBug from "./pages/ReportBug";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/**
 * Protected route component - redirects to home if wallet not connected
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

const App = () => (
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/about" element={<About />} />
              <Route path="/support" element={<Support />} />
              <Route path="/report-bug" element={<ReportBug />} />
              <Route path="/settings" element={<Settings />} />

              {/* Protected routes - require wallet connection */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deploy"
                element={
                  <ProtectedRoute>
                    <Deploy />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/monitor/:address"
                element={
                  <ProtectedRoute>
                    <Monitor />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </WagmiProvider>
);

export default App;

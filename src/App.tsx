
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ConsultantRegister from "./pages/ConsultantRegister";
import OrganizationRegister from "./pages/OrganizationRegister";
import ConsultantProfile from "./pages/ConsultantProfile";
import OrganizationProfile from "./pages/OrganizationProfile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/consultant/register" element={<ConsultantRegister />} />
          <Route path="/organization/register" element={<OrganizationRegister />} />
          <Route path="/consultant/profile" element={<ConsultantProfile />} />
          <Route path="/organization/profile" element={<OrganizationProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

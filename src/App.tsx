import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Analytics from "./pages/Analytics.tsx";
import Goals from "./pages/Goals.tsx";
import SplitBills from "./pages/SplitBills.tsx";
import Budget from "./pages/Budget.tsx";
import NotFound from "./pages/NotFound.tsx";
import AIChatbot from "./components/AIChatbot.tsx";
import ReceiptScanner from "./components/ReceiptScanner.tsx";
import VoiceExpense from "./components/VoiceExpense.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/split-bills" element={<SplitBills />} />
          <Route path="/budget" element={<Budget />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Global floating widgets */}
        <AIChatbot />
        <ReceiptScanner />
        <VoiceExpense />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

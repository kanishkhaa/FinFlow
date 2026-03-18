import Navbar from "@/components/dashboard/Navbar";
import StatCards from "@/components/dashboard/StatCards";
import SpendingChart from "@/components/dashboard/SpendingChart";
import BudgetProgress from "@/components/dashboard/BudgetProgress";
import Transactions from "@/components/dashboard/Transactions";
import SavingsGoals from "@/components/dashboard/SavingsGoals";
import AIInsights from "@/components/dashboard/AIInsights";
import FinancialHealth from "@/components/dashboard/FinancialHealth";
import { userProfile } from "@/data/dummyData";
import { motion } from "framer-motion";

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="p-4 md:p-8 max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="mb-6 md:mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight mb-1">
              Hey, {userProfile.name} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Here's your financial snapshot for March 2026.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-secondary hover:bg-secondary/80 ring-1 ring-inset ring-white/[0.06] rounded-lg text-xs font-bold transition-all text-muted-foreground hover:text-foreground">
              EXPORT
            </button>
            <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-xs font-bold transition-all glow-primary">
              + ADD EXPENSE
            </button>
          </div>
        </motion.header>

        {/* Stat Cards */}
        <StatCards />

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {/* Left Column - Charts & Transactions */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <SpendingChart />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <BudgetProgress />
              <FinancialHealth />
            </div>
            <Transactions />
          </div>

          {/* Right Column - Goals, AI, Subs */}
          <div className="space-y-4 md:space-y-6">
            <SavingsGoals />
            <AIInsights />
          </div>
        </div>
      </main>
    </div>
  );
}

import Navbar from "@/components/dashboard/Navbar";
import { motion } from "framer-motion";
import { budgetCategories, userProfile } from "@/data/dummyData";
import { Lightbulb, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";

const recommendations = [
  {
    category: "Food",
    current: 3245,
    suggested: 3500,
    reason: "You're consistently spending ~₹3,200. Budget slightly above to avoid overshoot.",
    icon: "🍕",
    status: "warning" as const,
  },
  {
    category: "Travel",
    current: 890,
    suggested: 1200,
    reason: "Bus pass + occasional auto. Keep a buffer for exam days.",
    icon: "🚌",
    status: "good" as const,
  },
  {
    category: "Entertainment",
    current: 750,
    suggested: 800,
    reason: "Netflix + occasional movies. Well controlled, keep it tight.",
    icon: "🎬",
    status: "good" as const,
  },
  {
    category: "Shopping",
    current: 420,
    suggested: 1000,
    reason: "Low this month but spikes during sales. Average over 3 months is ₹980.",
    icon: "🛍️",
    status: "info" as const,
  },
  {
    category: "Education",
    current: 1200,
    suggested: 1500,
    reason: "Books and courses. Investing in skills — keep a healthy budget.",
    icon: "📚",
    status: "good" as const,
  },
];

const totalCurrent = recommendations.reduce((s, r) => s + r.current, 0);
const totalSuggested = recommendations.reduce((s, r) => s + r.suggested, 0);

export default function Budget() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="p-4 md:p-8 max-w-[1000px] mx-auto">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">Smart Budget</h1>
          <p className="text-sm text-muted-foreground">AI-powered budget recommendations based on your spending patterns.</p>
        </motion.header>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Current Spending", value: `₹${totalCurrent.toLocaleString()}`, icon: TrendingDown, color: "text-warning" },
            { label: "Suggested Budget", value: `₹${totalSuggested.toLocaleString()}`, icon: Lightbulb, color: "text-primary" },
            { label: "Potential Savings", value: `₹${(userProfile.monthlyIncome - totalSuggested).toLocaleString()}`, icon: TrendingUp, color: "text-accent" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-5">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className={s.color} />
                <span className="label-xs">{s.label}</span>
              </div>
              <p className="text-2xl font-mono font-medium">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Recommendations */}
        <h2 className="label-xs mb-4">Category Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, i) => {
            const diff = rec.suggested - rec.current;
            return (
              <motion.div
                key={rec.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="glass-card-hover p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl mt-0.5">{rec.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground">{rec.category}</h3>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground line-through">₹{rec.current.toLocaleString()}</span>
                        <span className="text-sm font-mono font-medium text-primary">₹{rec.suggested.toLocaleString()}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{rec.reason}</p>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((rec.current / rec.suggested) * 100, 100)}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                        className={`h-full rounded-full ${rec.current > rec.suggested ? "bg-destructive" : "bg-primary"}`}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px] text-muted-foreground">Spent: ₹{rec.current.toLocaleString()}</span>
                      <span className={`text-[10px] font-mono ${diff > 0 ? "text-primary" : "text-warning"}`}>
                        {diff > 0 ? `+₹${diff} buffer` : `₹${Math.abs(diff)} over`}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-card p-5 mt-8 border-l-2 border-primary">
          <div className="flex items-start gap-3">
            <AlertTriangle size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-xs text-muted-foreground">Following these budgets, you'll save ₹{(userProfile.monthlyIncome - totalSuggested).toLocaleString()}/month — that's ₹{((userProfile.monthlyIncome - totalSuggested) * 12).toLocaleString()}/year! Enough for a new laptop by June. 🎯</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

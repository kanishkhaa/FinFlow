import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, PiggyBank } from "lucide-react";
import { userProfile } from "@/data/dummyData";

const stats = [
  {
    label: "Total Balance",
    value: `₹${userProfile.totalBalance.toLocaleString()}`,
    trend: "+12.4%",
    trendUp: true,
    icon: Wallet,
    accentClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    label: "Monthly Income",
    value: `₹${userProfile.monthlyIncome.toLocaleString()}`,
    trend: "+5.8%",
    trendUp: true,
    icon: TrendingUp,
    accentClass: "text-accent",
    bgClass: "bg-accent/10",
  },
  {
    label: "Monthly Spent",
    value: `₹${userProfile.monthlySpent.toLocaleString()}`,
    trend: "-8.2%",
    trendUp: false,
    icon: TrendingDown,
    accentClass: "text-warning",
    bgClass: "bg-warning/10",
  },
  {
    label: "Savings",
    value: `₹${userProfile.currentSavings.toLocaleString()}`,
    trend: `${Math.round((userProfile.currentSavings / userProfile.savingsGoal) * 100)}%`,
    trendUp: true,
    icon: PiggyBank,
    accentClass: "text-primary",
    bgClass: "bg-primary/10",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: [0.2, 0, 0, 1] }}
          className="glass-card-hover p-4 md:p-5"
        >
          <div className="flex justify-between items-start mb-3">
            <span className="label-xs">{stat.label}</span>
            <div className={`w-7 h-7 rounded-lg ${stat.bgClass} flex items-center justify-center`}>
              <stat.icon size={14} className={stat.accentClass} />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-mono font-medium tracking-tight text-foreground mb-1">
            {stat.value}
          </h3>
          <span className={`text-xs font-mono ${stat.trendUp ? "text-primary" : "text-warning"}`}>
            {stat.trend} <span className="text-muted-foreground">vs last month</span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

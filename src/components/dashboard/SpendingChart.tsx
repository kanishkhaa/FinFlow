import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, AreaChart, Area } from "recharts";
import { weeklySpending, monthlyTrend } from "@/data/dummyData";
import { useState } from "react";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="font-mono" style={{ color: p.color }}>
            {p.name}: ₹{p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function SpendingChart() {
  const [view, setView] = useState<"weekly" | "monthly">("weekly");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="p-4 md:p-5 border-b border-border/50 flex justify-between items-center">
        <h2 className="label-xs">Spending Overview</h2>
        <div className="flex gap-1 bg-secondary rounded-lg p-0.5">
          {(["weekly", "monthly"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all ${
                view === v
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-5 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          {view === "weekly" ? (
            <BarChart data={weeklySpending} barSize={24}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="Spent" fill="hsl(160,84%,39%)" radius={[4, 4, 0, 0]} opacity={0.85} />
              <Bar dataKey="budget" name="Budget" fill="hsl(240,5%,25%)" radius={[4, 4, 0, 0]} opacity={0.4} />
            </BarChart>
          ) : (
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(38,92%,50%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(38,92%,50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="hsl(160,84%,39%)" fill="url(#incomeGrad)" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="hsl(38,92%,50%)" fill="url(#expenseGrad)" strokeWidth={2} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

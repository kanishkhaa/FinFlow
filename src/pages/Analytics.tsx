import Navbar from "@/components/dashboard/Navbar";
import { motion } from "framer-motion";
import { monthlyTrend, budgetCategories, weeklySpending } from "@/data/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const COLORS = ["hsl(160,84%,39%)", "hsl(190,90%,50%)", "hsl(38,92%,50%)", "hsl(280,70%,55%)", "hsl(340,75%,55%)", "hsl(240,5%,55%)"];

const categorySpending = budgetCategories.map(c => ({ name: c.name, value: c.spent, color: c.color }));

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="p-4 md:p-8 max-w-[1440px] mx-auto">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">Analytics</h1>
          <p className="text-sm text-muted-foreground">Deep dive into your spending patterns.</p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income vs Expense Trend */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
            <h2 className="label-xs mb-4">Income vs Expense (6 Months)</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyTrend} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,5%,15%)" />
                <XAxis dataKey="month" tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(240,5%,20%)", borderRadius: 8, color: "hsl(220,10%,90%)" }} />
                <Bar dataKey="income" fill="hsl(160,84%,39%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="hsl(38,92%,50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart - Category Breakdown */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
            <h2 className="label-xs mb-4">Spending by Category</h2>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={240}>
                <PieChart>
                  <Pie data={categorySpending} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                    {categorySpending.map((entry, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(240,5%,20%)", borderRadius: 8, color: "hsl(220,10%,90%)" }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {categorySpending.map((c, i) => (
                  <div key={c.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-xs text-muted-foreground">{c.name}</span>
                    <span className="text-xs font-mono text-foreground ml-auto">₹{c.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weekly Spending Heatmap/Area */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
            <h2 className="label-xs mb-4">Weekly Spending Pattern</h2>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={weeklySpending}>
                <defs>
                  <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160,84%,39%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160,84%,39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(240,5%,15%)" />
                <XAxis dataKey="day" tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} axisLine={false} />
                <YAxis tick={{ fill: "hsl(240,5%,55%)", fontSize: 11 }} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(240,10%,12%)", border: "1px solid hsl(240,5%,20%)", borderRadius: 8, color: "hsl(220,10%,90%)" }} />
                <Area type="monotone" dataKey="amount" stroke="hsl(160,84%,39%)" fill="url(#spendGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="budget" stroke="hsl(38,92%,50%)" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Monthly Comparison Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
            <h2 className="label-xs mb-4">Monthly Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-2 text-muted-foreground font-medium text-xs">Month</th>
                    <th className="text-right py-2 text-muted-foreground font-medium text-xs">Income</th>
                    <th className="text-right py-2 text-muted-foreground font-medium text-xs">Expense</th>
                    <th className="text-right py-2 text-muted-foreground font-medium text-xs">Savings</th>
                    <th className="text-right py-2 text-muted-foreground font-medium text-xs">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTrend.map(m => (
                    <tr key={m.month} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 font-medium">{m.month}</td>
                      <td className="py-2.5 text-right font-mono text-primary">₹{m.income.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-mono text-warning">₹{m.expense.toLocaleString()}</td>
                      <td className="py-2.5 text-right font-mono text-accent">₹{(m.income - m.expense).toLocaleString()}</td>
                      <td className="py-2.5 text-right font-mono text-muted-foreground">{Math.round(((m.income - m.expense) / m.income) * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

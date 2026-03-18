import { motion } from "framer-motion";
import { budgetCategories } from "@/data/dummyData";

export default function BudgetProgress() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="glass-card p-4 md:p-5"
    >
      <h2 className="label-xs mb-5">Budget Tracker</h2>
      <div className="space-y-4">
        {budgetCategories.map((cat, i) => {
          const pct = Math.round((cat.spent / cat.allocated) * 100);
          const isOver = pct > 80;
          return (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm text-foreground font-medium">{cat.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  ₹{cat.spent.toLocaleString()} <span className="text-muted-foreground/50">/ ₹{cat.allocated.toLocaleString()}</span>
                </span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(pct, 100)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: isOver ? "hsl(38,92%,50%)" : cat.color }}
                />
              </div>
              <div className="flex justify-end mt-1">
                <span className={`text-[10px] font-mono ${isOver ? "text-warning" : "text-muted-foreground"}`}>
                  {pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

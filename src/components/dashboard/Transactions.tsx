import { motion } from "framer-motion";
import { recentTransactions } from "@/data/dummyData";

export default function Transactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="p-4 md:p-5 border-b border-border/50 flex justify-between items-center">
        <h2 className="label-xs">Recent Transactions</h2>
        <button className="text-[10px] font-bold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="divide-y divide-border/30">
        {recentTransactions.slice(0, 6).map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.05, ease: [0.2, 0, 0, 1] }}
            className="flex items-center justify-between px-4 md:px-5 py-3 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-base">
                {tx.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{tx.description}</p>
                <p className="text-[11px] text-muted-foreground">
                  {tx.category} · {new Date(tx.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </p>
              </div>
            </div>
            <span className={`font-mono text-sm font-medium ${tx.amount > 0 ? "text-primary" : "text-foreground"}`}>
              {tx.amount > 0 ? "+" : ""}₹{Math.abs(tx.amount).toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

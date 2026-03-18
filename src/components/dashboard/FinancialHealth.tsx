import { motion } from "framer-motion";
import { userProfile } from "@/data/dummyData";
import { ShieldCheck } from "lucide-react";

export default function FinancialHealth() {
  const score = userProfile.financialHealthScore;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="glass-card p-4 md:p-5 flex flex-col items-center justify-center"
    >
      <h2 className="label-xs flex items-center gap-2 mb-4">
        <ShieldCheck size={14} className="text-primary" /> Financial Health
      </h2>
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(240,5%,18%)" strokeWidth="6" />
          <motion.circle
            cx="50" cy="50" r="45" fill="none"
            stroke="url(#healthGrad)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
          />
          <defs>
            <linearGradient id="healthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(160,84%,39%)" />
              <stop offset="100%" stopColor="hsl(190,90%,50%)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-bold text-foreground">{score}</span>
          <span className="text-[10px] text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-xs text-primary font-medium mt-3">Good Standing</p>
      <p className="text-[10px] text-muted-foreground text-center mt-1 max-w-[180px]">
        Your spending is well-controlled. Keep tracking daily!
      </p>
    </motion.div>
  );
}

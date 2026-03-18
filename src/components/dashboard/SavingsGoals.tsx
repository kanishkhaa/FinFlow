import { motion } from "framer-motion";
import { savingsGoals, userProfile } from "@/data/dummyData";
import { Target, Flame, Trophy } from "lucide-react";

export default function SavingsGoals() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="space-y-4"
    >
      {/* Gamification Card */}
      <div className="glass-card p-4 md:p-5 bg-primary/[0.04] ring-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Trophy size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Level {userProfile.level}</h3>
            <p className="text-[11px] text-muted-foreground">{userProfile.xp}/{userProfile.xpToNext} XP</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Flame size={14} className="text-warning" />
            <span className="font-mono text-sm font-bold text-warning">{userProfile.streak}d</span>
          </div>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(userProfile.xp / userProfile.xpToNext) * 100}%` }}
            transition={{ duration: 1, ease: [0.2, 0, 0, 1] }}
            className="h-full rounded-full bg-primary"
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-muted-foreground">🏅 {userProfile.badges} badges earned</span>
          <span className="text-[10px] text-primary font-mono">{Math.round((userProfile.xp / userProfile.xpToNext) * 100)}%</span>
        </div>
      </div>

      {/* Savings Goals */}
      <div className="glass-card p-4 md:p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="label-xs flex items-center gap-2">
            <Target size={14} className="text-primary" /> Savings Goals
          </h2>
        </div>
        <div className="space-y-4">
          {savingsGoals.map((goal) => {
            const pct = Math.round((goal.saved / goal.target) * 100);
            return (
              <div key={goal.id} className="p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{goal.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{goal.name}</p>
                      <p className="text-[10px] text-muted-foreground">by {goal.deadline}</p>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    ₹{goal.saved.toLocaleString()}<span className="text-muted-foreground/50">/{(goal.target / 1000).toFixed(0)}k</span>
                  </span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

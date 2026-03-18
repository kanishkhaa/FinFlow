import Navbar from "@/components/dashboard/Navbar";
import { motion } from "framer-motion";
import { savingsGoals, userProfile } from "@/data/dummyData";
import { Target, Trophy, Flame, Star } from "lucide-react";

export default function Goals() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="p-4 md:p-8 max-w-[1440px] mx-auto">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">Goals & Achievements</h1>
          <p className="text-sm text-muted-foreground">Track your savings goals and financial milestones.</p>
        </motion.header>

        {/* Gamification Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Level", value: userProfile.level, icon: Star, color: "text-warning" },
            { label: "XP", value: `${userProfile.xp}/${userProfile.xpToNext}`, icon: Target, color: "text-accent" },
            { label: "Streak", value: `${userProfile.streak} days`, icon: Flame, color: "text-destructive" },
            { label: "Badges", value: userProfile.badges, icon: Trophy, color: "text-primary" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={16} className={s.color} />
                <span className="label-xs">{s.label}</span>
              </div>
              <p className="text-2xl font-mono font-medium">{s.value}</p>
            </motion.div>
          ))}
        </div>

        {/* XP Progress */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5 mb-8">
          <div className="flex justify-between items-center mb-3">
            <h2 className="label-xs">Level Progress</h2>
            <span className="text-xs font-mono text-muted-foreground">{userProfile.xp} / {userProfile.xpToNext} XP</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(userProfile.xp / userProfile.xpToNext) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>

        {/* Savings Goals */}
        <h2 className="label-xs mb-4">Savings Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savingsGoals.map((goal, i) => {
            const pct = Math.round((goal.saved / goal.target) * 100);
            return (
              <motion.div key={goal.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="glass-card-hover p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{goal.icon}</span>
                  <div>
                    <h3 className="font-medium text-foreground">{goal.name}</h3>
                    <p className="text-xs text-muted-foreground">Deadline: {goal.deadline}</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-mono text-foreground">₹{goal.saved.toLocaleString()}</span>
                  <span className="font-mono text-muted-foreground">₹{goal.target.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  />
                </div>
                <p className="text-xs text-primary font-mono mt-2">{pct}% complete</p>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

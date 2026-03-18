import { motion } from "framer-motion";
import { aiInsights, subscriptions, billSplits } from "@/data/dummyData";
import { Sparkles, AlertTriangle, Lightbulb, Trophy, TrendingUp, CreditCard, Users } from "lucide-react";

const iconMap = {
  warning: AlertTriangle,
  tip: Lightbulb,
  achievement: Trophy,
  prediction: TrendingUp,
};

const colorMap = {
  warning: "text-warning bg-warning/10",
  tip: "text-accent bg-accent/10",
  achievement: "text-primary bg-primary/10",
  prediction: "text-primary bg-primary/10",
};

export default function AIInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className="space-y-4"
    >
      {/* AI Insights */}
      <div className="glass-card p-4 md:p-5">
        <h2 className="label-xs flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-accent" /> AI Insights
        </h2>
        <div className="space-y-3">
          {aiInsights.map((insight, i) => {
            const Icon = iconMap[insight.type as keyof typeof iconMap];
            const colors = colorMap[insight.type as keyof typeof colorMap];
            return (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-secondary/40">
                <div className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center ${colors}`}>
                  <Icon size={13} />
                </div>
                <p className="text-xs text-secondary-foreground leading-relaxed">{insight.message}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscriptions */}
      <div className="glass-card p-4 md:p-5">
        <h2 className="label-xs flex items-center gap-2 mb-4">
          <CreditCard size={14} className="text-muted-foreground" /> Subscriptions
        </h2>
        <div className="space-y-3">
          {subscriptions.map((sub) => (
            <div key={sub.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-base">{sub.icon}</span>
                <div>
                  <p className="text-sm text-foreground">{sub.name}</p>
                  <p className="text-[10px] text-muted-foreground">Next: {sub.nextBilling}</p>
                </div>
              </div>
              <span className="font-mono text-xs text-foreground">₹{sub.amount}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-border/30 flex justify-between">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Total/month</span>
            <span className="font-mono text-xs font-bold text-foreground">
              ₹{subscriptions.reduce((s, x) => s + x.amount, 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Bill Splits */}
      <div className="glass-card p-4 md:p-5">
        <h2 className="label-xs flex items-center gap-2 mb-4">
          <Users size={14} className="text-muted-foreground" /> Bill Splits
        </h2>
        <div className="space-y-3">
          {billSplits.map((bill) => (
            <div key={bill.id} className="p-3 rounded-lg bg-secondary/40 flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground font-medium">{bill.title}</p>
                <p className="text-[10px] text-muted-foreground">{bill.people.length} people · Your share: ₹{bill.yourShare}</p>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                bill.status === "settled"
                  ? "bg-primary/10 text-primary"
                  : "bg-warning/10 text-warning"
              }`}>
                {bill.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

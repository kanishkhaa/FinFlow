import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { userProfile, budgetCategories, recentTransactions } from "@/data/dummyData";

interface Message {
  id: number;
  role: "user" | "ai";
  text: string;
}

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  const remaining = userProfile.monthlyBudget - userProfile.monthlySpent;
  const foodBudget = budgetCategories.find(c => c.name === "Food");
  const topCategory = [...budgetCategories].sort((a, b) => b.spent - a.spent)[0];

  if (lower.includes("afford") || lower.includes("can i buy") || lower.includes("headphones")) {
    const amount = parseInt(input.replace(/[^\d]/g, "")) || 2000;
    if (amount <= remaining) {
      return `Yes! You have ₹${remaining.toLocaleString()} remaining this month. Buying something for ₹${amount.toLocaleString()} would still leave you with ₹${(remaining - amount).toLocaleString()}. Go for it! 🎉`;
    }
    return `That's tight. You only have ₹${remaining.toLocaleString()} left this month. A ₹${amount.toLocaleString()} purchase would push you over budget by ₹${(amount - remaining).toLocaleString()}. Maybe wait till next month? 💡`;
  }

  if (lower.includes("spending too much") || lower.includes("overspend") || lower.includes("where")) {
    return `Your highest spending is **${topCategory.name}** at ₹${topCategory.spent.toLocaleString()} (${Math.round((topCategory.spent / topCategory.allocated) * 100)}% of budget). ${foodBudget ? `Food is at ${Math.round((foodBudget.spent / foodBudget.allocated) * 100)}% with half the month remaining — watch out! 🍕` : ""}`;
  }

  if (lower.includes("weekend") || lower.includes("how much can i spend")) {
    const weekendBudget = Math.round(remaining * 0.15);
    return `Based on your remaining budget of ₹${remaining.toLocaleString()}, I'd suggest keeping weekend spending under **₹${weekendBudget.toLocaleString()}**. That's enough for a movie + dinner! 🎬🍽️`;
  }

  if (lower.includes("save") || lower.includes("savings")) {
    return `You've saved ₹${userProfile.currentSavings.toLocaleString()} of your ₹${userProfile.savingsGoal.toLocaleString()} goal (${Math.round((userProfile.currentSavings / userProfile.savingsGoal) * 100)}%). At this rate, you'll hit your target in about ${Math.ceil((userProfile.savingsGoal - userProfile.currentSavings) / (userProfile.monthlyIncome - userProfile.monthlySpent))} months! 🎯`;
  }

  if (lower.includes("balance") || lower.includes("total")) {
    return `Your total balance is **₹${userProfile.totalBalance.toLocaleString()}**. Monthly income: ₹${userProfile.monthlyIncome.toLocaleString()}, spent so far: ₹${userProfile.monthlySpent.toLocaleString()}.`;
  }

  if (lower.includes("tip") || lower.includes("advice") || lower.includes("help")) {
    return `Here are some quick tips:\n• Cook at home 3x/week to save ~₹2,400/month\n• Your streak is ${userProfile.streak} days — keep tracking!\n• Set up auto-deductions for savings goals\n• Review subscriptions — you might not need all of them 💡`;
  }

  return `I can help with:\n• "Can I afford ₹X?"\n• "Where am I spending too much?"\n• "How much can I spend this weekend?"\n• "How are my savings?"\n• "Give me tips"\n\nTry asking one of these! 🤖`;
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "ai", text: "Hey! I'm your AI Finance Coach 🤖. Ask me anything about your spending, budget, or savings!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", text: getMockResponse(userMsg.text) };
      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg glow-primary z-50"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[360px] max-h-[500px] glass-card flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-foreground">AI Finance Coach</h3>
                <p className="text-[10px] text-muted-foreground">Powered by your expense data</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[340px]">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "ai" && (
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="Ask about your finances..."
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button onClick={send} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

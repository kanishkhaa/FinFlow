import Navbar from "@/components/dashboard/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import { Plus, X, Users, Receipt, Check } from "lucide-react";

interface Friend {
  id: number;
  name: string;
}

interface Split {
  name: string;
  amount: number;
}

export default function SplitBills() {
  const [billAmount, setBillAmount] = useState("");
  const [billTitle, setBillTitle] = useState("");
  const [friends, setFriends] = useState<Friend[]>([{ id: 1, name: "You" }]);
  const [newFriend, setNewFriend] = useState("");
  const [splits, setSplits] = useState<Split[]>([]);

  const addFriend = () => {
    if (!newFriend.trim()) return;
    setFriends([...friends, { id: Date.now(), name: newFriend.trim() }]);
    setNewFriend("");
  };

  const removeFriend = (id: number) => {
    if (friends.length <= 1) return;
    setFriends(friends.filter(f => f.id !== id));
  };

  const calculateSplit = () => {
    const amount = parseFloat(billAmount);
    if (!amount || friends.length === 0) return;
    const perPerson = Math.round((amount / friends.length) * 100) / 100;
    setSplits(friends.map(f => ({ name: f.name, amount: perPerson })));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="p-4 md:p-8 max-w-[800px] mx-auto">
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight mb-1">Split Bills</h1>
          <p className="text-sm text-muted-foreground">Split expenses with friends easily.</p>
        </motion.header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="label-xs mb-2 block">Bill Title</label>
              <input
                value={billTitle}
                onChange={e => setBillTitle(e.target.value)}
                placeholder="e.g. Dinner at Barbeque Nation"
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="label-xs mb-2 block">Total Amount (₹)</label>
              <input
                type="number"
                value={billAmount}
                onChange={e => setBillAmount(e.target.value)}
                placeholder="2400"
                className="w-full bg-secondary rounded-lg px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={16} className="text-primary" />
            <h2 className="label-xs">People ({friends.length})</h2>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              value={newFriend}
              onChange={e => setNewFriend(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addFriend()}
              placeholder="Add friend name"
              className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={addFriend} className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {friends.map(f => (
              <motion.div key={f.id} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2 bg-secondary rounded-full px-3 py-1.5">
                <span className="text-sm text-foreground">{f.name}</span>
                {f.name !== "You" && (
                  <button onClick={() => removeFriend(f.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X size={12} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <button onClick={calculateSplit} className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors glow-primary mb-6">
            <Receipt size={16} className="inline mr-2" />
            SPLIT BILL
          </button>
        </motion.div>

        {splits.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h2 className="label-xs mb-4">Split Result {billTitle && `— ${billTitle}`}</h2>
            <div className="space-y-3">
              {splits.map((s, i) => (
                <motion.div key={s.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between py-3 px-4 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{s.name[0]}</span>
                    </div>
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-foreground">₹{s.amount.toLocaleString()}</span>
                    {s.name === "You" && <Check size={14} className="text-primary" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

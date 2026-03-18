import { Bell, Search, Wallet, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { userProfile } from "@/data/dummyData";
import { useState } from "react";
import { NavLink } from "@/components/NavLink";

const navItems = [
  { label: "Dashboard", to: "/" },
  { label: "Analytics", to: "/analytics" },
  { label: "Goals", to: "/goals" },
  { label: "Split Bills", to: "/split-bills" },
  { label: "Budget", to: "/budget" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="h-14 border-b border-border/50 flex items-center justify-between px-4 md:px-6 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-8">
        <NavLink to="/" className="flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-primary"
          >
            <Wallet size={16} className="text-primary-foreground" />
          </motion.div>
          <span className="font-mono font-bold tracking-tight text-foreground text-lg">
            Fin<span className="text-primary">Flow</span>
          </span>
        </NavLink>
        <div className="hidden md:flex gap-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide uppercase text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-primary/10"
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="hidden md:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <Search size={16} className="text-muted-foreground" />
        </button>
        <button className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors">
          <Bell size={16} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 ring-1 ring-primary/30 flex items-center justify-center">
          <span className="text-[10px] font-bold text-primary">{userProfile.avatar}</span>
        </div>
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu size={18} className="text-muted-foreground" />
        </button>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-14 left-0 right-0 bg-card border-b border-border p-4 flex flex-col gap-1 md:hidden z-50"
        >
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className="text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-all"
              activeClassName="text-primary bg-primary/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </motion.div>
      )}
    </nav>
  );
}

export const userProfile = {
  name: "Kanishkhaa",
  avatar: "KM",
  college: "Bannari Amman Institute of Technology",
  monthlyBudget: 15000,
  totalBalance: 42580,
  monthlyIncome: 18000,
  monthlySpent: 11420,
  savingsGoal: 50000,
  currentSavings: 32400,
  financialHealthScore: 78,
  streak: 14,
  badges: 7,
  level: 12,
  xp: 2400,
  xpToNext: 3000,
};

export const recentTransactions = [
  { id: "TXN-001", description: "Zomato Order", category: "Food", amount: -245, date: "2026-03-17T10:30:00Z", icon: "🍕" },
  { id: "TXN-002", description: "UPI from Dad", category: "Income", amount: 5000, date: "2026-03-16T18:00:00Z", icon: "💰" },
  { id: "TXN-003", description: "Netflix Subscription", category: "Entertainment", amount: -199, date: "2026-03-16T00:00:00Z", icon: "🎬" },
  { id: "TXN-004", description: "College Canteen", category: "Food", amount: -120, date: "2026-03-15T13:00:00Z", icon: "🍛" },
  { id: "TXN-005", description: "Flipkart - Books", category: "Education", amount: -899, date: "2026-03-15T09:15:00Z", icon: "📚" },
  { id: "TXN-006", description: "Bus Pass Recharge", category: "Transport", amount: -500, date: "2026-03-14T07:00:00Z", icon: "🚌" },
  { id: "TXN-007", description: "Freelance Payment", category: "Income", amount: 3500, date: "2026-03-13T20:00:00Z", icon: "💻" },
  { id: "TXN-008", description: "Chai & Snacks", category: "Food", amount: -80, date: "2026-03-13T16:00:00Z", icon: "☕" },
];

export const budgetCategories = [
  { name: "Food", allocated: 4000, spent: 3245, color: "hsl(160, 84%, 39%)" },
  { name: "Transport", allocated: 1500, spent: 890, color: "hsl(190, 90%, 50%)" },
  { name: "Entertainment", allocated: 1000, spent: 750, color: "hsl(38, 92%, 50%)" },
  { name: "Education", allocated: 2000, spent: 1200, color: "hsl(280, 70%, 55%)" },
  { name: "Shopping", allocated: 1500, spent: 420, color: "hsl(340, 75%, 55%)" },
  { name: "Others", allocated: 2000, spent: 915, color: "hsl(240, 5%, 55%)" },
];

export const weeklySpending = [
  { day: "Mon", amount: 320, budget: 500 },
  { day: "Tue", amount: 580, budget: 500 },
  { day: "Wed", amount: 240, budget: 500 },
  { day: "Thu", amount: 450, budget: 500 },
  { day: "Fri", amount: 890, budget: 500 },
  { day: "Sat", amount: 670, budget: 500 },
  { day: "Sun", amount: 380, budget: 500 },
];

export const monthlyTrend = [
  { month: "Oct", income: 16000, expense: 12500 },
  { month: "Nov", income: 17000, expense: 11800 },
  { month: "Dec", income: 18500, expense: 14200 },
  { month: "Jan", income: 17500, expense: 10900 },
  { month: "Feb", income: 18000, expense: 12100 },
  { month: "Mar", income: 18000, expense: 11420 },
];

export const savingsGoals = [
  { id: 1, name: "New Laptop", target: 45000, saved: 32000, icon: "💻", deadline: "Jun 2026" },
  { id: 2, name: "Emergency Fund", target: 10000, saved: 8500, icon: "🛡️", deadline: "Apr 2026" },
  { id: 3, name: "Trip to Goa", target: 15000, saved: 4200, icon: "✈️", deadline: "Aug 2026" },
];

export const billSplits = [
  { id: 1, title: "Dinner at Barbeque Nation", total: 2400, people: ["You", "Arun", "Priya", "Dev"], yourShare: 600, status: "pending" },
  { id: 2, title: "Movie Night - IMAX", total: 1200, people: ["You", "Sneha", "Raj"], yourShare: 400, status: "settled" },
  { id: 3, title: "Grocery Split", total: 800, people: ["You", "Roommate"], yourShare: 400, status: "pending" },
];

export const subscriptions = [
  { name: "Netflix", amount: 199, nextBilling: "Apr 16", icon: "🎬" },
  { name: "Spotify", amount: 119, nextBilling: "Apr 01", icon: "🎵" },
  { name: "iCloud", amount: 75, nextBilling: "Apr 05", icon: "☁️" },
  { name: "ChatGPT Plus", amount: 1650, nextBilling: "Apr 12", icon: "🤖" },
];

export const aiInsights = [
  { type: "warning", message: "You've spent 81% of your Food budget with 14 days remaining." },
  { type: "tip", message: "Cooking at home 3x/week could save you ₹2,400/month based on your pattern." },
  { type: "achievement", message: "Great job! You've maintained a 14-day expense tracking streak! 🔥" },
  { type: "prediction", message: "At current rate, you'll save ₹6,580 this month — ₹1,080 above target!" },
];

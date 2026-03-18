import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, Upload, FileText, Loader2 } from "lucide-react";

interface ScanResult {
  store: string;
  amount: number;
  category: string;
  date: string;
  items: string[];
}

const mockResults: ScanResult[] = [
  { store: "Barbeque Nation", amount: 2400, category: "Food", date: "17 Mar 2026", items: ["Dinner Buffet x4", "Mocktails x4", "Service Charge"] },
  { store: "Flipkart", amount: 899, category: "Education", date: "15 Mar 2026", items: ["Data Structures Book", "Delivery Fee"] },
  { store: "Apollo Pharmacy", amount: 350, category: "Health", date: "14 Mar 2026", items: ["Paracetamol", "Vitamin C", "Band-Aid"] },
  { store: "Reliance Fresh", amount: 680, category: "Groceries", date: "13 Mar 2026", items: ["Rice 5kg", "Milk x3", "Eggs", "Vegetables"] },
];

export default function ReceiptScanner() {
  const [open, setOpen] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [fileName, setFileName] = useState("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setScanning(true);
    setResult(null);

    // Simulate OCR processing
    setTimeout(() => {
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setScanning(false);
    }, 2000);
  };

  const reset = () => {
    setResult(null);
    setFileName("");
    setScanning(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-24 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg glow-accent z-50"
      >
        <Camera size={22} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="glass-card w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-accent" />
                  <h2 className="text-lg font-medium">Receipt Scanner</h2>
                </div>
                <button onClick={() => { setOpen(false); reset(); }} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={18} />
                </button>
              </div>

              {!result && !scanning && (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/50 rounded-xl p-10 cursor-pointer hover:border-accent/50 transition-colors">
                  <Upload size={32} className="text-muted-foreground mb-3" />
                  <p className="text-sm text-foreground font-medium mb-1">Upload Receipt Image</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG or PDF</p>
                  <input type="file" accept="image/*,.pdf" onChange={handleUpload} className="hidden" />
                </label>
              )}

              {scanning && (
                <div className="flex flex-col items-center py-10">
                  <Loader2 size={32} className="text-accent animate-spin mb-4" />
                  <p className="text-sm text-foreground font-medium">Scanning {fileName}...</p>
                  <p className="text-xs text-muted-foreground mt-1">Extracting details with OCR</p>
                </div>
              )}

              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="label-xs">Store</span>
                        <p className="text-sm font-medium mt-1">{result.store}</p>
                      </div>
                      <div>
                        <span className="label-xs">Amount</span>
                        <p className="text-sm font-mono font-medium text-primary mt-1">₹{result.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="label-xs">Category</span>
                        <p className="text-sm font-medium mt-1">{result.category}</p>
                      </div>
                      <div>
                        <span className="label-xs">Date</span>
                        <p className="text-sm font-medium mt-1">{result.date}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="label-xs mb-2 block">Items Detected</span>
                    <div className="space-y-1.5">
                      {result.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button onClick={reset} className="flex-1 py-2.5 bg-secondary text-foreground rounded-lg text-xs font-bold hover:bg-secondary/80 transition-colors">
                      SCAN ANOTHER
                    </button>
                    <button onClick={() => { setOpen(false); reset(); }} className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors">
                      ADD EXPENSE
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Check, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ParsedExpense {
  amount: number;
  category: string;
  description: string;
}

function parseExpense(text: string): ParsedExpense | null {
  const lower = text.toLowerCase();
  
  // Try to extract amount
  const amountMatch = lower.match(/(?:₹|rs\.?|rupees?)\s*(\d+)/i) || lower.match(/(\d+)\s*(?:₹|rs|rupees?)/i) || lower.match(/spent\s+(\d+)/i) || lower.match(/(\d+)\s+(?:on|for)/i);
  if (!amountMatch) return null;
  
  const amount = parseInt(amountMatch[1]);
  
  // Detect category
  let category = "Others";
  if (/food|eat|lunch|dinner|breakfast|snack|chai|coffee|pizza|burger|biryani|canteen|zomato|swiggy/.test(lower)) category = "Food";
  else if (/travel|bus|auto|uber|ola|petrol|fuel|cab|train|metro/.test(lower)) category = "Transport";
  else if (/movie|netflix|spotify|game|entertainment|fun/.test(lower)) category = "Entertainment";
  else if (/book|course|udemy|education|study|tuition|class/.test(lower)) category = "Education";
  else if (/shop|cloth|shirt|shoe|amazon|flipkart|myntra/.test(lower)) category = "Shopping";
  else if (/medical|medicine|doctor|pharmacy|health/.test(lower)) category = "Health";
  
  return { amount, category, description: text };
}

export default function VoiceExpense() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [parsed, setParsed] = useState<ParsedExpense | null>(null);
  const recognitionRef = useRef<any>(null);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({ title: "Not Supported", description: "Speech recognition isn't available in this browser.", variant: "destructive" });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const text = Array.from(event.results).map((r: any) => r[0].transcript).join("");
      setTranscript(text);
    };

    recognition.onend = () => {
      setListening(false);
      if (transcript) {
        const result = parseExpense(transcript);
        setParsed(result);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      toast({ title: "Error", description: "Couldn't hear you. Try again.", variant: "destructive" });
    };

    recognitionRef.current = recognition;
    setTranscript("");
    setParsed(null);
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const confirmExpense = () => {
    if (parsed) {
      toast({ title: "Expense Added! ✅", description: `₹${parsed.amount} in ${parsed.category}` });
      setParsed(null);
      setTranscript("");
    }
  };

  const cancel = () => {
    setParsed(null);
    setTranscript("");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">
      {/* Parsed Result */}
      <AnimatePresence>
        {parsed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-card p-4 mb-2 w-64"
          >
            <p className="text-xs text-muted-foreground mb-2">Detected expense:</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">{parsed.category}</span>
              <span className="font-mono text-sm text-primary font-medium">₹{parsed.amount.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-muted-foreground italic mb-3">"{parsed.description}"</p>
            <div className="flex gap-2">
              <button onClick={confirmExpense} className="flex-1 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-primary/90 transition-colors">
                <Check size={12} /> Add
              </button>
              <button onClick={cancel} className="flex-1 py-1.5 bg-secondary text-foreground rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-secondary/80 transition-colors">
                <X size={12} /> Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript */}
      <AnimatePresence>
        {listening && transcript && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="glass-card px-3 py-2 mb-1 max-w-[240px]">
            <p className="text-xs text-foreground italic">"{transcript}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mic Button */}
      <motion.button
        onClick={listening ? stopListening : startListening}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50 transition-colors ${listening ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
      >
        {listening ? <MicOff size={22} /> : <Mic size={22} />}
      </motion.button>
      <span className="text-[9px] text-muted-foreground font-medium ml-1">
        {listening ? "Listening..." : "Voice Entry"}
      </span>
    </div>
  );
}

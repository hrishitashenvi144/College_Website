import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import DOMPurify from "dompurify";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  "What programs are offered?",
  "How do I apply?",
  "Tell me about placements",
  "Campus facilities?",
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! 👋 I'm D-Bot, your Diastas University assistant. Ask me anything about programs, admissions, campus life, or placements!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    const sanitized = DOMPurify.sanitize(text.trim(), { ALLOWED_TAGS: [] });
    if (!sanitized) return;

    const userMsg: Message = { role: "user", content: sanitized };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    // Simple local response system (no API key needed)
    setTimeout(() => {
      const lower = sanitized.toLowerCase();
      let response = "I'd be happy to help! For detailed information, please visit our admissions office or check the specific page on our website. Is there anything else I can help with?";

      if (lower.includes("program") || lower.includes("course")) {
        response = "Diastas offers 100+ programs across 8 schools: Computer Science, Mechanical Engineering, Medicine, Fine Arts, Business, Law, Physics, and International Studies. Visit the Academics page for the full catalog! 📚";
      } else if (lower.includes("apply") || lower.includes("admission")) {
        response = "Applications for 2025-26 are open! You'll need your 10+2 marks, entrance exam scores (JEE/NEET/CAT as applicable), and basic documents. Check the Admissions page for the step-by-step process. 🎓";
      } else if (lower.includes("placement") || lower.includes("job") || lower.includes("career")) {
        response = "Our placement record is stellar! 95% placement rate, ₹42 LPA highest package, 350+ companies visit campus. Top recruiters include Google, Microsoft, Amazon, and Goldman Sachs. Check out the Placements page! 💼";
      } else if (lower.includes("campus") || lower.includes("hostel") || lower.includes("facility")) {
        response = "Our 100+ acre campus features smart classrooms, a 100,000+ book library, sports complex with swimming pool, separate hostels, innovation hub, and a 24/7 medical center. Take the virtual Campus Tour! 🏫";
      } else if (lower.includes("fee") || lower.includes("cost") || lower.includes("scholarship")) {
        response = "Fees vary by program: B.Tech ₹1.5-2.5L/year, MBA ~₹3L/year. We offer merit scholarships up to 100% tuition, plus special scholarships for sports achievers and economically weaker sections. 💰";
      } else if (lower.includes("research")) {
        response = "Diastas has 24 research labs with ₹120Cr+ in funding. Focus areas include AI/ML, Quantum Computing, Biomedical Sciences, and Renewable Energy. We publish 430+ papers annually! 🔬";
      } else if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
        response = "Hello there! 👋 Welcome to Diastas University. I can help you with info about programs, admissions, placements, campus life, and more. What would you like to know?";
      }

      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ boxShadow: isOpen ? "none" : "0 0 20px hsl(var(--primary) / 0.4)" }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[480px] glass-strong rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">D</div>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-sm">D-Bot</h3>
                <p className="text-[10px] text-muted-foreground">Diastas University Assistant</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "glass text-foreground rounded-bl-md"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestion chips (only if 1 message) */}
              {messages.length <= 1 && !isTyping && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="px-3 py-1.5 glass text-xs text-foreground hover:text-primary hover:border-primary/30 transition-colors rounded-full"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="p-3 border-t border-border flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask D-Bot..."
                className="flex-1 px-3 py-2 rounded-xl bg-muted text-foreground text-sm border border-border focus:border-primary outline-none"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50 transition-opacity"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;

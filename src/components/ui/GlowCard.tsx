import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

const GlowCard = ({ children, className = "", hover = true }: GlowCardProps) => (
  <motion.div
    className={`glass p-6 ${className}`}
    whileHover={hover ? { y: -8, scale: 1.02 } : undefined}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default GlowCard;

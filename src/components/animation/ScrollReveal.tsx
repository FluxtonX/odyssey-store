"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeInUp } from "@/lib/motion/animations";

interface ScrollRevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  viewportAmount?: number;
}

export default function ScrollReveal({
  children,
  variants = fadeInUp,
  className = "",
  delay = 0,
  viewportAmount = 0.2,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: viewportAmount }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

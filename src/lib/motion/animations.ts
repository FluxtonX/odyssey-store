import { Variants } from "framer-motion";

// Custom Luxury Easing Curves
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Stagger Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Fade In Up Reveal
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: LUXURY_EASE,
    },
  },
};

// Blur Reveal for Headlines
export const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(16px)",
    scale: 0.95,
  },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.9,
      ease: LUXURY_EASE,
    },
  },
};

// Fade In Left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

// Fade In Right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
};

// Scale In for Cards and Media
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: LUXURY_EASE },
  },
};

// Floating Levitation Loop
export const floatingLevitation: Variants = {
  animate: {
    y: [0, -12, 0],
    rotateX: [0, 3, 0],
    rotateY: [0, 4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

// Micro-interaction Physics
export const buttonHover = {
  scale: 1.03,
  y: -2,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const buttonTap = {
  scale: 0.96,
  y: 0,
  transition: { duration: 0.1, ease: "easeIn" },
};

export const cardHover = {
  y: -6,
  scale: 1.015,
  transition: { duration: 0.3, ease: LUXURY_EASE },
};

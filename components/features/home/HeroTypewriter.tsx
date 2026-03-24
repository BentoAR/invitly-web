"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeroTypewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.8 }}
          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
          exit={{
            y: -16,
            opacity: 0,
            transition: { duration: 0.22, ease: "easeIn" },
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          style={{ color: "#bc8129" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

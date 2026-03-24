"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp } from "@/utils/openWhatsapp";
import { useTranslations } from "next-intl";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({
  message = "Hola! 👋 Me das una mano para hacer mi invitacion digital?",
  className = "",
}: WhatsAppButtonProps) => {
  const t = useTranslations("WhatsappHelp");
  const [showText, setShowText] = useState(false);
  const [buttonLoaded, setButtonLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText(true);

      setTimeout(() => {
        setShowText(false);
      }, 3000);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    openWhatsApp(message);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="relative flex items-center justify-end">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="mr-4 relative"
            >
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-[200px]">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {t("helpButton")}
                </p>

                <div className="absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <div className="w-0 h-0 border-l-8 border-l-white dark:border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-0 h-0 border-l-6 border-l-gray-200 dark:border-l-gray-700 border-t-3 border-t-transparent border-b-3 border-b-transparent"></div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowText(false);
                }}
                className="absolute -top-2 -left-2 w-6 h-6 bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <motion.button
            onClick={handleClick}
            className="w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group relative z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 3,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            onAnimationComplete={() => setButtonLoaded(true)}
          >
            <MessageCircle
              className={`w-6 h-6 group-hover:scale-110 transition-transform `}
            />
          </motion.button>

          {!showText && buttonLoaded && (
            <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

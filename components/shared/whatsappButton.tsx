"use client";
import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { openWhatsApp } from "@/utils/openWhatsapp";
import { useTranslations } from "next-intl";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({
  message = "Hola! quiero ser parte de la experiencia Bento",
  className = "",
}: WhatsAppButtonProps) => {
  const t = useTranslations("WhatsappHelp");
  const [showText, setShowText] = useState(false);
  const [buttonLoaded, setButtonLoaded] = useState(false);

  useEffect(() => {
    let dismissTimeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setShowText(true);

      dismissTimeout = setTimeout(() => {
        setShowText(false);
      }, 3000);
    }, 15000);

    const loadedTimeout = setTimeout(() => setButtonLoaded(true), 3400);

    return () => {
      clearInterval(interval);
      clearTimeout(loadedTimeout);
      if (dismissTimeout) clearTimeout(dismissTimeout);
    };
  }, []);

  const handleClick = () => {
    openWhatsApp(message);
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="relative flex items-center justify-end">
        {showText && (
            <div className="relative mr-4 animate-[whatsapp-pop_0.22s_cubic-bezier(0.16,1,0.3,1)_both]">
              <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-[200px]">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {t("helpButton")}
                </p>

                <div className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800" />
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
            </div>
          )}

        <div className="relative">
          <button
            onClick={handleClick}
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-xl active:scale-95 animate-[whatsapp-enter_0.45s_cubic-bezier(0.16,1,0.3,1)_3s_both]"
          >
            <MessageCircle
              className={`w-6 h-6 group-hover:scale-110 transition-transform `}
            />
          </button>

          {!showText && buttonLoaded && (
            <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

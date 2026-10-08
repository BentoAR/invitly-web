"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { openWhatsApp } from "@/utils/openWhatsapp";
import { useTranslations } from "next-intl";
import { analytics } from "@/utils/analytics";
import { usePathname } from "next/navigation";

const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({
  message = "Hola! quiero ser parte de la experiencia Bento",
  className = "",
}: WhatsAppButtonProps) => {
  const t = useTranslations("WhatsappHelp");
  const pathname = usePathname();
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
    analytics.whatsappClicked('floating_button');
    openWhatsApp(message);
  };

  if (pathname.includes("/invitaciones-digitales-para-organizadores")) return null;

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
            aria-label="WhatsApp"
            className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#20BA5A] hover:shadow-xl active:scale-95 animate-[whatsapp-enter_0.45s_cubic-bezier(0.16,1,0.3,1)_3s_both]"
          >
            <WhatsAppIcon className="h-7 w-7" />
          </button>

          {!showText && buttonLoaded && (
            <div className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
};

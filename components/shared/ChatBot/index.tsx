"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage as ChatMessageType, ChatOption } from "@/types/chatbot";
import { chatbotSteps, chatbotConfig } from "@/utils/chatbotFlow";
import ChatMessage from "./ChatMessage";
import { cn } from "@/utils/shadcn";
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeSentRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendBotMessage = useCallback((stepId: string) => {
    const step = chatbotSteps[stepId];
    if (!step) return;

    setIsTyping(true);

    setTimeout(() => {
      const botMessage: ChatMessageType = {
        id: `bot-${Date.now()}`,
        text: step.message,
        sender: "bot",
        timestamp: new Date(),
        options: step.options,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, step.delay || 800);
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0 && !welcomeSentRef.current) {
      welcomeSentRef.current = true;
      setTimeout(() => {
        sendBotMessage("welcome");
      }, 500);
    }
    if (!isOpen) {
      welcomeSentRef.current = false;
    }
  }, [isOpen, messages.length, sendBotMessage]);

  const handleOptionClick = (option: ChatOption) => {
    // Agregar mensaje del usuario
    setMessages((prev) => {
      const userMessage: ChatMessageType = {
        id: `user-${Date.now()}`,
        text: option.label,
        sender: "user",
        timestamp: new Date(),
      };
      return [...prev, userMessage];
    });

    switch (option.action) {
      case "respond":
        if (option.nextStep) {
          setTimeout(() => {
            sendBotMessage(option.nextStep!);
          }, 600);
        }
        break;

      case "navigate":
        break;

      case "contact":
        if (option.id === "whatsapp") {
          const whatsappUrl = `https://wa.me/${chatbotConfig.whatsappNumber}?text=Hola,%20necesito%20ayuda%20con%20Bento`;
          window.open(whatsappUrl, "_blank");
        }
        break;

      case "external":
        if (option.id === "send_email") {
          const mailtoUrl = `mailto:${chatbotConfig.contactEmail}?subject=Consulta desde Bento`;
          window.open(mailtoUrl, "_blank");
        }
        break;

      default:
        break;
    }
  };

  const resetChat = () => {
    setMessages([]);
    setTimeout(() => {
      sendBotMessage("welcome");
    }, 300);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant={isOpen ? "destructive" : "default"}
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110",
          !isOpen && "bg-primary text-primary-foreground"
        )}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] bg-background rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300 border border-primary">
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-lg">Asistente Bento</h3>
                <p className="text-xs opacity-90">Siempre disponible</p>
              </div>
            </div>
            <Button
              onClick={resetChat}
              variant="ghost"
              size="icon"
              aria-label="Reiniciar chat"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-background">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 mb-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  🤖
                </div>
                <div className="bg-background border border-primary rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Opciones de respuesta */}
          {!isTyping &&
            messages.length > 0 &&
            messages[messages.length - 1].options &&
            messages[messages.length - 1].options!.length > 0 && (
              <div className="p-4 bg-background border-t border-primary">
                <div className="space-y-2">
                  {messages[messages.length - 1].options!.map((option) => (
                    <Button
                      key={option.id}
                      onClick={() => handleOptionClick(option)}
                      variant="outline"
                      size="default"
                      className="w-full text-left"
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

          <div className="p-3 bg-background text-center text-xs text-primary border-t border-primary">
            Powered by Bento • Siempre aquí para ayudarte 💜
          </div>
        </div>
      )}
    </>
  );
}

import { cn } from "@/utils/shadcn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[90vw] lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

import { AlertCircle, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export function ErrorState({
  message = "Ocurrió un error al cargar los datos",
  onRetry,
  retryLabel = "Intentar de nuevo",
  className = ""
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-3">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-700 font-medium">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <RotateCw className="h-4 w-4" />
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  onClose: () => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const toastStyles = {
  success: {
    bg: "bg-green-50 dark:bg-green-950/40",
    border: "border-green-200 dark:border-green-800",
    icon: <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />,
    title: "text-green-900 dark:text-green-50",
    description: "text-green-700 dark:text-green-200",
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-800",
    icon: <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
    title: "text-red-900 dark:text-red-50",
    description: "text-red-700 dark:text-red-200",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-200 dark:border-blue-800",
    icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    title: "text-blue-900 dark:text-blue-50",
    description: "text-blue-700 dark:text-blue-200",
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    title: "text-yellow-900 dark:text-yellow-50",
    description: "text-yellow-700 dark:text-yellow-200",
  },
};

export function Toast({
  id,
  type,
  title,
  description,
  action,
  onClose,
}: ToastProps) {
  const styles = toastStyles[type];

  return (
    <div
      className={cn(
        "rounded-lg border p-4 animate-in fade-in slide-in-from-right-full",
        styles.bg,
        styles.border
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
        <div className="flex-1">
          <h3 className={cn("font-semibold text-sm", styles.title)}>
            {title}
          </h3>
          {description && (
            <p className={cn("text-sm mt-1", styles.description)}>
              {description}
            </p>
          )}
          {action && (
            <button
              onClick={action.onClick}
              className={cn(
                "mt-2 text-sm font-medium underline hover:no-underline transition-colors",
                styles.title
              )}
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors -mr-1 -mt-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastProps[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-3 pointer-events-none z-50">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={() => onClose(toast.id)} />
        </div>
      ))}
    </div>
  );
}

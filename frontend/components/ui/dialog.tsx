import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  closeOnBackdropClick?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "md",
  closeOnBackdropClick = true,
}: DialogProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm animate-in fade-in"
        onClick={() => closeOnBackdropClick && onOpenChange(false)}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-lg bg-background shadow-lg p-6 animate-in fade-in zoom-in-95",
          sizeStyles[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="dialog-title" className="text-lg font-semibold">
              {title}
            </h2>
            {description && (
              <p
                id="dialog-description"
                className="text-sm text-muted-foreground mt-1"
              >
                {description}
              </p>
            )}
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">{children}</div>

        {footer && (
          <div className="flex gap-3 justify-end border-t border-border/60 pt-6">
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      size="sm"
    >
      <div className="flex gap-3 justify-end pt-6 border-t border-border/60">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={variant === "destructive" ? "destructive" : "default"}
          onClick={handleConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}

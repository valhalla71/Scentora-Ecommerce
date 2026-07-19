import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input = ({
  className,
  type,
  error,
  helperText,
  ...props
}: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      <input
        type={type}
        className={cn(
          "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-all duration-300 ease-luxury",
          "placeholder:text-muted-foreground",
          "focus:border-ring focus:ring-2 focus:ring-ring/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:border-input/80",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          className
        )}
        {...props}
      />
      {helperText && (
        <p
          className={cn(
            "text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export { Input };

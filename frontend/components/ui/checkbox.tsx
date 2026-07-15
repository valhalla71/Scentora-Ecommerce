import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Checkbox = ({
  className,
  label,
  helperText,
  id,
  ...props
}: CheckboxProps) => {
  return (
    <div className="flex items-start gap-2">
      <div className="flex items-center h-6">
        <input
          id={id}
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border border-input bg-background cursor-pointer",
            "transition-colors outline-none",
            "focus:ring-2 focus:ring-ring/50 focus:border-ring",
            "accent-primary",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            className
          )}
          {...props}
        />
      </div>
      {label && (
        <div className="flex flex-col gap-1">
          <label
            htmlFor={id}
            className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
          {helperText && (
            <p className="text-xs text-muted-foreground">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};

export { Checkbox };

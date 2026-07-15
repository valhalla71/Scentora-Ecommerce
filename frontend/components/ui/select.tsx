import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  helperText?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = ({
  className,
  error,
  helperText,
  options,
  ...props
}: SelectProps) => {
  return (
    <div className="w-full space-y-1.5">
      <select
        className={cn(
          "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition-colors appearance-none",
          "placeholder:text-muted-foreground",
          "focus:border-ring focus:ring-2 focus:ring-ring/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:border-input/80",
          "cursor-pointer",
          "pr-8",
          error && "border-destructive focus:border-destructive focus:ring-destructive/20",
          className
        )}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23888' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.75rem center",
          backgroundSize: "16px 12px",
          paddingRight: "2rem",
        }}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
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

export { Select };

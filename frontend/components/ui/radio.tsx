import { cn } from "@/lib/utils";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = ({ className, label, id, ...props }: RadioProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        id={id}
        type="radio"
        className={cn(
          "h-4 w-4 rounded-full border-2 border-input bg-background cursor-pointer",
          "transition-colors outline-none",
          "focus:ring-2 focus:ring-ring/50 focus:border-ring",
          "accent-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export { Radio };

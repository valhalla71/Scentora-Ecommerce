import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
}

const Card = ({ className, variant = "default", ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-card p-6 transition-all duration-300 ease-luxury",
        variant === "default" && "border border-border/60",
        variant === "outlined" && "border-2 border-border/40",
        variant === "elevated" &&
          "hover-lift border border-border/40 shadow-luxury-sm hover:shadow-luxury-md",
        className
      )}
      {...props}
    />
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 mb-6", className)} {...props} />
);

export interface CardTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardTitle = ({ className, ...props }: CardTitleProps) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
);

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = ({ className, ...props }: CardDescriptionProps) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props} />
);

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("pt-0", className)} {...props} />
);

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div className={cn("flex items-center gap-3 pt-6 border-t border-border/60", className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };

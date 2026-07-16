import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[44px] w-full rounded-[12px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0F172A]/50 px-[14px] py-2 text-[14px] font-[450] tracking-[-0.01em] text-slate-900 dark:text-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200",
        "placeholder:text-slate-400 dark:placeholder:text-slate-500",
        "hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm",
        "focus-visible:outline-none focus-visible:border-[#2563EB]/50 focus-visible:ring-[3px] focus-visible:ring-[#2563EB]/12 focus-visible:shadow-[0_0_0_3px_rgba(37,99,235,0.1)] dark:focus-visible:border-[#3B82F6]/50 dark:focus-visible:ring-[#3B82F6]/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900/50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-[14px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#0F172A]/50 px-[14px] py-[12px] text-[14px] font-[450] leading-[1.6] tracking-[-0.01em] text-slate-900 dark:text-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200",
          "placeholder:text-slate-400 dark:placeholder:text-slate-500",
          "hover:border-slate-300 dark:hover:border-slate-600",
          "focus-visible:outline-none focus-visible:border-[#2563EB]/50 focus-visible:ring-[3px] focus-visible:ring-[#2563EB]/12",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

const SearchInput = React.forwardRef<HTMLInputElement, InputProps & { onClear?: () => void }>(
  ({ className, onClear, ...props }, ref) => {
    return (
      <div className="relative group">
        <div className="pointer-events-none absolute left-[13px] top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-[#2563EB] dark:group-focus-within:text-[#60A5FA] transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <input
          ref={ref}
          className={cn(
            "flex h-[44px] w-full rounded-[14px] border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#1E293B]/50 pl-[38px] pr-[14px] py-2 text-[14px] font-[450] text-slate-900 dark:text-slate-100 shadow-sm transition-all duration-200",
            "placeholder:text-slate-400 dark:placeholder:text-slate-500",
            "hover:border-slate-300 dark:hover:border-slate-600 hover:shadow",
            "focus-visible:outline-none focus-visible:border-[#2563EB]/40 focus-visible:ring-[4px] focus-visible:ring-[#2563EB]/10 focus-visible:shadow-[0_0_0_4px_rgba(37,99,235,0.08)]",
            className
          )}
          {...props}
        />
        {onClear && (props.value as string)?.length > 0 && (
          <button
            onClick={onClear}
            className="absolute right-[10px] top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
            type="button"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { Input, Textarea, SearchInput };

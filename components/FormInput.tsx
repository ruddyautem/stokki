import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  optionalLabel?: string;
}

const inputClasses =
  "w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all";

/** Shared styled form input with optional label */
const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, required, optionalLabel, className, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className='block text-sm font-semibold text-slate-900 mb-2'
          >
            {label}{" "}
            {required && <span className='text-red-500'>*</span>}
            {optionalLabel && (
              <span className='text-slate-400'>{optionalLabel}</span>
            )}
          </label>
        )}
        <input ref={ref} className={`${inputClasses} ${className || ""}`} {...props} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;

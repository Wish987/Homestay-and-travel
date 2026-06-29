/**
 * Button Component
 * Props:
 * variant: primary | secondary | outline
 * size: sm | md | lg
 * disabled: boolean
 * onClick: function
 */

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
}) {

  const variants = {
    primary: "bg-amber-500 text-white hover:bg-amber-600",
    secondary: "bg-slate-800 text-white hover:bg-slate-700",
    outline: "border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-2xl transition-all duration-300 shadow-md
      ${variants[variant]}
      ${sizes[size]}
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {children}
    </button>
  );
}
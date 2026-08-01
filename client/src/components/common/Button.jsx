function Button({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4
        py-2
        rounded-lg
        bg-blue-600
        text-white
        hover:bg-blue-700
        disabled:bg-gray-400
        transition
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
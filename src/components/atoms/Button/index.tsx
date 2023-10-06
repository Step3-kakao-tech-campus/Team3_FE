interface Props {
  styleType: "white" | "thunder";
  rounded: "full" | "md";
  size: "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button({ styleType, rounded, size, onClick, children }: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1 bg-white",
    thunder: "bg-thunder text-white",
  };
  const sizeObj = {
    lg: "w-[546px] h-[40px] text-xl",
    sm: "",
  };
  return (
    <button
      type="button"
      className={`px-2 py-1 ring-gray-400 ring-inset font-bold filter hover:brightness-95 ${styleObj[styleType]} rounded-${rounded} ${sizeObj[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

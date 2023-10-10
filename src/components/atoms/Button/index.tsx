interface Props {
  styleType: "white" | "thunder" | "outlined-gray";
  rounded: "full" | "md";
  size: "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  noLineHeight?: boolean;
}

function Button({ styleType, rounded, size, onClick, children, noLineHeight }: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1 bg-white",
    thunder: "bg-thunder text-white",
    "outlined-gray": "border border-neutral-400 text-neutral-400 bg-white",
  };
  const sizeObj = {
    lg: "w-[546px] h-[40px] text-xl",
    sm: "",
  };
  const roundedObj = {
    full: "rounded-full",
    md: "rounded-md",
  };

  return (
    <button
      type="button"
      className={`px-2 py-1 ring-gray-400 ring-inset font-bold filter hover:brightness-95 ${styleObj[styleType]} ${
        roundedObj[rounded]
      } ${sizeObj[size]} ${noLineHeight && "leading-none"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

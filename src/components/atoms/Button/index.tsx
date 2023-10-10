interface Props {
  styleType: "white" | "thunder" | "outlined-gray" | "outlined-orange" | "outlined-blue" | "filled-blue";
  rounded: "full" | "md";
  size: "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  noLineHeight?: boolean;
  fontWeight?: "bold" | "semibold" | "normal";
  fontSize?: "sm" | "md" | "lg";
}

function Button({
  styleType,
  rounded,
  size,
  onClick,
  children,
  noLineHeight,
  fontWeight = "bold",
  fontSize = "md",
}: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1 bg-white",
    thunder: "bg-thunder text-white",
    "outlined-gray": "border border-neutral-400 text-neutral-400 bg-white",
    "outlined-orange": `border-thunderOrange text-thunderOrange bg-white`,
    "outlined-blue": `border-blue-400 text-blue-400 bg-white`,
    "filled-blue": `text-white bg-blue-500`,
  };
  const sizeObj = {
    lg: "w-[546px] h-[40px] text-xl",
    sm: "",
  };
  const roundedObj = {
    full: "rounded-full",
    md: "rounded-md",
  };
  const fontWeightObj = {
    bold: "font-bold",
    semibold: "font-semibold",
    normal: "font-normal",
  };
  const fontSizeObj = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <button
      type="button"
      className={`px-2 py-1 ring-gray-400 ring-inset filter hover:brightness-95 ${styleObj[styleType]} ${
        roundedObj[rounded]
      } ${sizeObj[size]} ${fontWeightObj[fontWeight]} ${fontSizeObj[fontSize]} ${noLineHeight && "leading-none"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

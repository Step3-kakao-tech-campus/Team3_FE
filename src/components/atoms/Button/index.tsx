export interface ButtonProps {
  styleType: "white" | "thunder" | "outlined-gray" | "outlined-orange" | "outlined-blue" | "filled-blue";
  rounded: "full" | "md";
  size: "lg" | "sm";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  noLineHeight?: boolean;
  fontWeight?: "bold" | "semibold" | "normal";
  fontSize?: "sm" | "md" | "lg";
  padding?: "px-2_py-1" | "px-2_py-[3px]";
  minWidth?: "70px";
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
  padding = "px-2_py-1",
  minWidth,
}: ButtonProps) {
  const commonStyle = "ring-gray-400 ring-inset filter hover:brightness-95";
  const styleObj = {
    white: "text-gray-600 ring-1 bg-white",
    thunder: "bg-thunder text-white",
    "outlined-gray": "border border-neutral-400 text-neutral-400 bg-white",
    "outlined-orange": `border border-thunderOrange text-thunderOrange bg-white`,
    "outlined-blue": `border border-blue-400 text-blue-400 bg-white`,
    "filled-blue": `border text-white bg-blue-500`,
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
  const paddingObj = {
    "px-2_py-1": "px-2 py-1",
    "px-2_py-[3px]": "px-2 py-[3px]",
  };
  const minWidthObj = {
    "70px": "min-w-[70px]",
  };

  return (
    <button
      type="button"
      className={`${commonStyle} ${styleObj[styleType]} ${roundedObj[rounded]} ${sizeObj[size]} ${
        fontWeightObj[fontWeight]
      } ${fontSizeObj[fontSize]} ${paddingObj[padding]} ${minWidth && minWidthObj[minWidth]} ${
        noLineHeight && "leading-none"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

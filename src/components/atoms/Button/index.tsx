export interface ButtonProps {
  styleType: "white" | "thunder" | "outlined-gray" | "outlined-orange" | "outlined-blue" | "filled-blue" | "filled-red";
  rounded: "full" | "md";
  size: "lg" | "md" | "sm" | "xs";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  fontWeight?: "bold" | "semibold" | "normal";
}

function Button({ styleType, rounded, size, onClick, children, fontWeight = "bold" }: ButtonProps): JSX.Element {
  const commonStyle = "ring-gray-400 ring-inset filter hover:brightness-95";
  const styleObj = {
    white: "text-gray-600 ring-1 bg-white",
    thunder: "bg-thunder text-white",
    "outlined-gray": "border border-neutral-400 text-neutral-400 bg-white",
    "outlined-orange": `border border-thunderOrange text-thunderOrange bg-white`,
    "outlined-blue": `border border-blue-400 text-blue-400 bg-white`,
    "filled-blue": `border text-white bg-blue-500`,
    "filled-red": "bg-[#FF2E2E] text-white",
  };
  const sizeObj = {
    lg: "w-[546px] h-[40px] text-xl",
    sm: "px-2 py-1",
    md: "px-2 py-1.5 min-w-[100px]",
    xs: "px-2 py-[3px] leading-none text-sm min-w-[80px]",
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

  return (
    <button
      type="button"
      className={`${commonStyle} ${styleObj[styleType]} ${roundedObj[rounded]} ${sizeObj[size]} ${fontWeightObj[fontWeight]} 
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

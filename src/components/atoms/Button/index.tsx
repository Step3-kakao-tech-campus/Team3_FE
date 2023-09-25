interface Props {
  style: "white" | "thunder";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button({ style, onClick, children }: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1",
    thunder: "bg-thunder text-white",
  };
  return (
    <button
      className={`px-2 py-1 ring-gray-400 ring-inset rounded-md font-bold ${styleObj[style]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

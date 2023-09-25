interface Props {
  styleType: "white" | "thunder";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button({ styleType, onClick, children }: Props) {
  const styleObj = {
    white: "text-gray-600 ring-1",
    thunder: "bg-thunder text-white",
  };
  return (
    <button
      type="button"
      className={`px-2 py-1 ring-gray-400 ring-inset rounded-md font-bold ${styleObj[styleType]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

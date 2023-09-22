interface Props {
  children: React.ReactNode;
}

function Background({ children }: Props) {
  return <div className="h-screen bg-gray-300 overflow-auto">{children}</div>;
}

export default Background;

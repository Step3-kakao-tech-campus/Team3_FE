interface Props {
  children: React.ReactNode;
}

function Background({ children }: Props) {
  return <div className="h-screen pt-16 bg-gray-200 overflow-auto">{children}</div>;
}

export default Background;

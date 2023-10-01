interface Props {
  children: React.ReactNode;
}

function OptionTitle({ children }: Props) {
  return <div className="my-4 font-bold text-xl">{children}</div>;
}

export default OptionTitle;

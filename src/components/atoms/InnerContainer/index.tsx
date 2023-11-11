interface Props {
  children: React.ReactNode;
}

function InnerContainer({ children }: Props): JSX.Element {
  return <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 md:px-0">{children}</div>;
}

export default InnerContainer;

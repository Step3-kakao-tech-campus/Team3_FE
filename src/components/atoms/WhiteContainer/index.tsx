interface Props {
  children: React.ReactNode;
}
function WhiteContainer({ children }: Props): JSX.Element {
  return <div className="mt-8 p-16 bg-white lg:mx-28 md:p-4">{children}</div>;
}

export default WhiteContainer;

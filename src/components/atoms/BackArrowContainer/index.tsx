import BackArrowButton from "../BackArrowButton";

interface Props {
  children: React.ReactNode;
}

function BackArrowContainer({ children }: Props) {
  return (
    <div className="mt-8 p-16 bg-white lg:mx-28">
      <BackArrowButton />
      {children}
    </div>
  );
}

export default BackArrowContainer;

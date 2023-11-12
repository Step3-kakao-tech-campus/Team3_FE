import BackArrowButton from "../BackArrowButton";
import WhiteContainer from "../WhiteContainer";

interface Props {
  children: React.ReactNode;
}

function BackArrowContainer({ children }: Props): JSX.Element {
  return (
    <WhiteContainer>
      <BackArrowButton />
      {children}
    </WhiteContainer>
  );
}

export default BackArrowContainer;

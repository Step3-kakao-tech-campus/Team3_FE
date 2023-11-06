import BackArrowContainer from "@/components/atoms/BackArrowContainer";

interface Props {
  children: React.ReactNode;
}
function MyPageLayout({ children }: Props): JSX.Element {
  return <BackArrowContainer>{children}</BackArrowContainer>;
}

export default MyPageLayout;

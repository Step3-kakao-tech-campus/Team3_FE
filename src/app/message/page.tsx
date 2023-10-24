import BackArrowContainer from "@/components/atoms/BackArrowContainer";
import MessageRoomList from "@/components/organisms/MessageRoomList";

function MessageHome() {
  return (
    <BackArrowContainer>
      <MessageRoomList />
    </BackArrowContainer>
  );
}

export default MessageHome;

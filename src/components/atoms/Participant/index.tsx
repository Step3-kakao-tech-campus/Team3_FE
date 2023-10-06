import { MdPeopleAlt } from "react-icons/md";

interface Props {
  currentNumber: number;
}

function Participant({ currentNumber }: Props) {
  return (
    <span className="text-sm mx-2 font-bold">
      <MdPeopleAlt className="inline mr-1 text-neutral-400" />
      <span>참석 </span>
      <span className="text-[#37D629]">{currentNumber}</span>
    </span>
  );
}

export default Participant;

import { Dispatch, SetStateAction } from "react";
import { MdStar, MdStarBorder } from "react-icons/md";

interface Props {
  star: number;
  setStar: Dispatch<SetStateAction<number>>;
}
function StarButtons({ star, setStar }: Props) {
  const handleStarClick = (newStar: number) => {
    setStar(newStar);
  };

  return (
    <div className="five-star-buttons">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          type="button"
          key={value}
          className={`star-button ${value <= star ? "selected" : ""} text-4xl text-thunderOrange`}
          onClick={() => handleStarClick(value)}
        >
          {value <= star ? <MdStar /> : <MdStarBorder />}
        </button>
      ))}
    </div>
  );
}

export default StarButtons;

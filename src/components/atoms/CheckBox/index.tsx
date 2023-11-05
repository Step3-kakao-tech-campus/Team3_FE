import React from "react";

interface Props {
  id: number;
  setCheckList: React.Dispatch<React.SetStateAction<number[]>>;
}

function CheckBox({ id, setCheckList }: Props): JSX.Element {
  const handleOnChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      setCheckList((prev) => [...prev, id]);
    } else {
      setCheckList((prev) => prev.filter((item) => item !== parseInt(e.target.value, 10)));
    }
  };

  return (
    <input
      type="checkbox"
      value={id}
      className="mr-4 w-4 h-4 rounded-md cursor-pointer"
      onChange={(e) => handleOnChecked(e)}
      onDoubleClick={(e) => {
        e.stopPropagation();
      }}
    />
  );
}

export default CheckBox;

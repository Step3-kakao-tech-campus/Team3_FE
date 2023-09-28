"use client";

interface Props {
  options: { name: string; id: number }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder: string;
  styleType: "big" | "small";
  selectedOptionId?: string;
}

function Dropdown({ options, onChange, placeholder, styleType, selectedOptionId }: Props) {
  const styleObj = {
    small: "rounded-full p-1 min-w-[130px]",
    big: "rounded-3xl p-5 min-w-[230px] text-2xl text-center",
  };
  return (
    <select onChange={onChange} className={`border text-neutral-500 ${styleObj[styleType]}`} defaultValue={-1}>
      <option key="placeholder" value={-1} disabled hidden>
        {placeholder}
      </option>
      {placeholder !== "광역시 / 도" && (
        <option key="select_all" value={-1}>
          전체
        </option>
      )}
      {options?.map((option) => {
        if (selectedOptionId === option.id.toString()) {
          return (
            <option key={option.id} value={option.id} selected>
              {option.name}
            </option>
          );
        }
        return (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
}
export default Dropdown;

"use client";

interface Props {
  options: any;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder: string;
  styleType: "big" | "small";
  selectedOptionId?: number;
}

function Dropdown({ options, onChange, placeholder, styleType, selectedOptionId }: Props) {
  const styleObj = {
    small: "rounded-full p-1 min-w-[130px]",
    big: "rounded-3xl p-5 min-w-[230px] text-2xl text-center",
  };
  return (
    <select
      onChange={onChange}
      className={`border text-neutral-500 ${styleObj[styleType]}`}
      value={typeof selectedOptionId !== undefined ? selectedOptionId : -1}
    >
      <option key="placeholder" value={-1} hidden>
        {placeholder}
      </option>
      {placeholder !== "광역시 / 도" && (
        <option key="select_all" value={0}>
          전체
        </option>
      )}
      {options?.map((option: any) => {
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

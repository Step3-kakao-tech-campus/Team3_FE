"use client";

interface Props {
  options: { name: string; id: number }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  placeholder: string;
  styleType: "big" | "small";
  selectedOptionId?: number;
}

function Dropdown({ options, onChange, placeholder, styleType, selectedOptionId = -1 }: Props) {
  const styleObj = {
    small: "rounded-full text-center p-1 w-[150px]",
    big: "rounded-3xl p-4 w-[180px] text-xl text-center shadow-lg",
  };
  return (
    <select
      onChange={onChange}
      className={`border text-neutral-500 appearance-none ${styleObj[styleType]}`}
      value={selectedOptionId}
    >
      <option key="placeholder" value={-1} hidden disabled>
        {placeholder}
      </option>
      {(placeholder === "시 / 군 / 구" || placeholder === "읍 / 면 / 동") && (
        <option key="select_all" value={0} disabled={!options.length} hidden={!options.length}>
          전체
        </option>
      )}
      {placeholder === "시 / 군 / 구" && options.length === 0 && (
        <option key="required" value={-1} disabled>
          광역시 / 도를 먼저 선택해 주세요
        </option>
      )}
      {placeholder === "읍 / 면 / 동" && options.length === 0 && (
        <option key="required" value={-1} disabled>
          시 / 군 / 구를 먼저 선택해 주세요
        </option>
      )}
      {options?.map((option) => {
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

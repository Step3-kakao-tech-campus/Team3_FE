"use client";

interface Props {
  options: { name: string; id: number }[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
  placeholder: string;
}

function Dropdown({ options, onChange, className, placeholder }: Props) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <select
        onChange={onChange}
        className="border rounded-full p-2"
        style={{ borderRadius: "20px", padding: "4px", minWidth: "90px" }}
      >
        <option key="placeholder" value={-1} disabled hidden selected>
          {placeholder}
        </option>
        <option key="select_all" value={-1}>
          전체
        </option>
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Dropdown;

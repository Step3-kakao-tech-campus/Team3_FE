interface Props {
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

function Dropdown({ options, selectedValue, onChange, className }: Props) {
  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <select
        value={selectedValue}
        onChange={onChange}
        className="border rounded-full p-2"
        style={{ borderRadius: "20px", padding: "4px", minWidth: "90px" }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Dropdown;

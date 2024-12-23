const Dropdown = ({ options, label, onChange }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select className="border bg-gray-200 font-semibold border-gray-300 p-2 rounded cursor-pointer" onChange={(e) => onChange(e.target.value)}>
      <option value="">All</option> {/* Default option */}
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
      </select>
    </div>
  );
};

export default Dropdown;

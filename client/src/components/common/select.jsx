function Select({
  label,
  name,
  register,
  options = [],
  required = false,
  defaultValue = "",
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <select
        defaultValue={defaultValue}
        {...register(name, { required })}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={typeof option === "string" ? option : option.value}
            value={typeof option === "string" ? option : option.value}
          >
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

function Input({
  label,
  type = "text",
  register,
  name,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name, { required })}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default Input;
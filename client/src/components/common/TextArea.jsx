function TextArea({
  label,
  register,
  name,
  placeholder,
  rows = 4,
}) {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default TextArea;
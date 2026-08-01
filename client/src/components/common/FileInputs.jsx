function FileInput({
  label,
  name,
  register,
}) {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-medium">
        {label}
      </label>

      <input
        type="file"
        {...register(name)}
        className="w-full rounded-lg border border-gray-300 p-2"
      />
    </div>
  );
}

export default FileInput;
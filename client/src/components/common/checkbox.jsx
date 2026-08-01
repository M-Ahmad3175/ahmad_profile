function Checkbox({
  label,
  name,
  register,
}) {
  return (
    <label className="mb-4 flex items-center gap-2">
      <input
        type="checkbox"
        {...register(name)}
      />

      {label}
    </label>
  );
}

export default Checkbox;
import Button from "../common/Button";
import Card from "../common/Card";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Select from "../common/Select";
import Checkbox from "../common/Checkbox";
import FileInput from "../common/FileInput";

function CrudForm({
  title,
  fields,
  register,
  handleSubmit,
  onSubmit,
  isSubmitting,
  submitLabel,
}) {

  const renderField = (field) => {

    switch (field.type) {

      case "textarea":
        return (
          <TextArea
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
            placeholder={field.placeholder}
          />
        );

      case "select":
        return (
          <Select
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
            options={field.options}
            required={field.required}
            defaultValue={field.defaultValue}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
          />
        );

      case "file":
        return (
          <FileInput
            key={field.name}
            label={field.label}
            name={field.name}
            register={register}
          />
        );

      default:
        return (
          <Input
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            name={field.name}
            register={register}
            placeholder={field.placeholder}
            required={field.required}
          />
        );
    }
  };

  return (
    <Card>

      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        {fields.map(renderField)}

        <Button
          type="submit"
          disabled={isSubmitting}
        >
            {isSubmitting ? "Saving..." : submitLabel || "Save"}
        </Button>

      </form>

    </Card>
  );
}

export default CrudForm;
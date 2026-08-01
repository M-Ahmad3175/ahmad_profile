import CrudPage from "../../components/crud/CrudPage";
import resumeService from "../../services/resumeService";

const config = {
  title: "Resume",

  service: resumeService,

  fields: [
    {
      name: "resumeUrl",
      label: "Resume URL",
      type: "url",
      required: true,
    },
    {
      name: "fileName",
      label: "File Name",
      type: "text",
      required: true,
    },
    {
      name: "fileSize",
      label: "File Size (bytes)",
      type: "number",
      required: true,
    },
    {
      name: "publicId",
      label: "Public ID",
      type: "text",
    },
    {
      name: "isActive",
      label: "Active Resume",
      type: "checkbox",
    },
  ],

  columns: [
    {
      key: "fileName",
      label: "File Name",
      type: "text",
    },
    {
      key: "resumeUrl",
      label: "Resume",
      type: "link",
    },
    {
      key: "isActive",
      label: "Status",
      type: "badge",
    },
  ],
};

export default function Resume() {
  return <CrudPage config={config} />;
}
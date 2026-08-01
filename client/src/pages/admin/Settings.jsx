import CrudPage from "../../components/crud/CrudPage";
import settingsService from "../../services/settingsService";

const config = {
  title: "Settings",

  service: settingsService,

  fields: [
    {
      name: "websiteTitle",
      label: "Website Title",
      required: true,
    },
    {
      name: "websiteDescription",
      label: "Description",
      type: "textarea",
    },
    {
      name: "logoUrl",
      label: "Logo URL",
      type: "url",
    },
    {
      name: "faviconUrl",
      label: "Favicon URL",
      type: "url",
    },
    {
      name: "primaryColor",
      label: "Primary Color",
      type: "text",
      placeholder: "#2563eb",
    },
    {
      name: "resumeUrl",
      label: "Resume URL",
      type: "url",
    },
    {
      name: "footerText",
      label: "Footer Text",
      type: "text",
    },
    {
      name: "contactEmail",
      label: "Contact Email",
      type: "email",
    },
    {
      name: "contactPhone",
      label: "Contact Phone",
      type: "text",
    },
    {
      name: "address",
      label: "Address",
      type: "textarea",
    },
  ],

  columns: [
    {
      key: "websiteTitle",
      label: "Website",
      type: "text",
    },
    {
      key: "contactEmail",
      label: "Email",
      type: "text",
    },
  ],
};

export default function Settings() {
  return <CrudPage config={config} />;
}
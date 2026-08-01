import CrudPage from "../../components/crud/CrudPage";
import certificateService from "../../services/certificateService";

const config = {
  title: "Certificate",

  service: certificateService,

  fields: [
    {
      name: "title",
      label: "Certificate Title",
      type: "text",
      required: true,
    },
    {
      name: "issuingOrganization",
      label: "Issuing Organization",
      type: "text",
      required: true,
    },
    {
      name: "issueDate",
      label: "Issue Date",
      type: "date",
      required: true,
    },
    {
      name: "credentialId",
      label: "Credential ID",
      type: "text",
    },
    {
      name: "credentialUrl",
      label: "Credential URL",
      type: "url",
      required: true,
    },
    {
      name: "certificateImage",
      label: "Certificate Image URL",
      type: "url",
    },
    {
      name: "featured",
      label: "Featured",
      type: "checkbox",
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  columns: [
    {
      key: "title",
      label: "Title",
      type: "text",
    },
    {
      key: "issuingOrganization",
      label: "Organization",
      type: "text",
    },
    {
      key: "credentialUrl",
      label: "Certificate",
      type: "link",
    },
  ],
};

export default function Certificates() {
  return <CrudPage config={config} />;
}
import CrudPage from "../../components/crud/CrudPage";
import messageService from "../../services/messageService";

const config = {
  title: "Messages",

  service: messageService,

  fields: [],

  columns: [
    {
      key: "name",
      label: "Name",
      type: "text",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
    {
      key: "subject",
      label: "Subject",
      type: "text",
    },
    {
      key: "isRead",
      label: "Read",
      type: "badge",
    },
  ],
};

export default function Messages() {
  return <CrudPage config={config} />;
}
import CrudPage from "../../components/crud/CrudPage";
import socialService from "../../services/socialService";

const config = {
  title: "Social Links",

  service: socialService,

  fields: [
    {
      name: "github",
      label: "GitHub URL",
      type: "url",
    },
    {
      name: "linkedin",
      label: "LinkedIn URL",
      type: "url",
    },
    {
      name: "leetcode",
      label: "LeetCode URL",
      type: "url",
    },
    {
      name: "topcoder",
      label: "TopCoder URL",
      type: "url",
    },
    {
      name: "x",
      label: "X URL",
      type: "url",
    },
    {
      name: "whatsapp",
      label: "WhatsApp URL",
      type: "url",
    },
    {
      name: "email",
      label: "Contact Email",
      type: "email",
    },
    {
      name: "resume",
      label: "Resume URL",
      type: "url",
    },
  ],

  columns: [
    {
      key: "github",
      label: "GitHub",
      type: "link",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      type: "link",
    },
    {
      key: "email",
      label: "Email",
      type: "text",
    },
  ],
};

export default function SocialLinks() {
  return <CrudPage config={config} />;
}
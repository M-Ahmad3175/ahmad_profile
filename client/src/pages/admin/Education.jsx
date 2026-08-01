import CrudPage from "../../components/crud/CrudPage";
import educationService from "../../services/educationService";

const config = {
  title: "Education",

  service: educationService,

  fields: [
    {
      name: "institution",
      label: "Institution",
      type: "text",
      placeholder: "University of Management and Technology",
    },
    {
      name: "degree",
      label: "Degree",
      type: "text",
      placeholder: "BS Software Engineering",
    },
    {
      name: "fieldOfStudy",
      label: "Field of Study",
      type: "text",
      placeholder: "Software Engineering",
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
    },
    {
      name: "currentlyStudying",
      label: "Currently Studying",
      type: "checkbox",
    },
    {
      name: "grade",
      label: "Grade / GPA",
      type: "text",
      placeholder: "3.51 CGPA",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Education details or achievements",
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ],

  columns: [
    {
      key: "institution",
      label: "Institution",
      type: "text",
    },
    {
      key: "degree",
      label: "Degree",
      type: "text",
    },
    {
      key: "fieldOfStudy",
      label: "Field Of Study",
      type: "text",
    },
    {
      key: "grade",
      label: "Grade",
      type: "text",
    },
  ],
};

function Education() {
  return <CrudPage config={config} />;
}

export default Education;
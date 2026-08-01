import { motion } from "framer-motion";

function Education({ education = [] }) {
  const formatDate = (dateValue) => {
    if (!dateValue) return "";

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return dateValue;

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section id="education" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Education
        </motion.h2>

        {education.length === 0 && (
          <p className="text-center text-gray-500">
            No education records available yet.
          </p>
        )}

        <div className="space-y-6">

        {education.map((item) => (

          <div
            key={item._id || item.degree}
            className="rounded-xl border border-gray-200 bg-gray-100 p-6 shadow-sm sm:p-8"
          >

            <h3 className="text-xl font-bold sm:text-2xl">
              {item.degree}
            </h3>

            <p className="mt-2 text-blue-600">
              {item.institution}
            </p>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              {formatDate(item.startDate)} {item.endDate ? `- ${formatDate(item.endDate)}` : item.currentlyStudying ? "- Present" : ""}
            </p>

            <p className="mt-3 font-semibold">
              {item.grade ? `Grade : ${item.grade}` : ""}
            </p>

            {item.description && (
              <p className="mt-3 text-gray-600">
                {item.description}
              </p>
            )}

          </div>

        ))}

        </div>

      </div>
    </section>
  );
}

export default Education;
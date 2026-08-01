import { motion } from "framer-motion";

function Experience({ experiences = [] }) {
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
    <section id="experience" className="bg-gray-100 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Experience
        </motion.h2>

        <div className="space-y-6">

          {experiences.length === 0 && (
            <p className="text-center text-gray-500">
              No experience available yet.
            </p>
          )}

          {experiences.map((item) => (

            <motion.div
              key={item._id || item.jobTitle}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-bold sm:text-2xl">
                {item.jobTitle}
              </h3>

              <p className="mt-1 font-semibold text-blue-600">
                {item.company}
              </p>

              <p className="mb-4 text-sm text-gray-500 sm:text-base">
                {formatDate(item.startDate)} {item.endDate ? `- ${formatDate(item.endDate)}` : item.currentlyWorking ? "- Present" : ""}
              </p>

              <p className="text-gray-600">
                {item.description}
              </p>

              {Array.isArray(item.technologies) && item.technologies.length > 0 && (
                <p className="mt-4 text-sm font-medium text-blue-600 sm:text-base">
                  {item.technologies.join(" • ")}
                </p>
              )}

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Experience;
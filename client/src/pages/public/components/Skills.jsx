import { motion } from "framer-motion";

function Skills({ skills = [] }) {
  return (
    <section
      id="skills"
      className="bg-gray-100 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <div className="space-y-6">

          {skills.length === 0 && (
            <p className="text-center text-gray-500">
              No skills available yet.
            </p>
          )}

          {skills.map((skill) => (

            <motion.div
              key={skill._id || skill.name}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >

              <div className="mb-2 flex items-center justify-between gap-4">

                <span className="font-medium text-gray-800">
                  {skill.name}
                </span>

                <span className="text-sm text-gray-500 sm:text-base">
                  {skill.proficiency ?? skill.level ?? 0}%
                </span>

              </div>

              <div className="h-2.5 w-full rounded-full bg-gray-200">

                <div
                  className="h-2.5 rounded-full bg-blue-600"
                  style={{
                    width: `${skill.proficiency ?? skill.level ?? 0}%`,
                  }}
                />

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Skills;
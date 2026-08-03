import { motion } from "framer-motion";

function Skills({ skills = [] }) {
  const groupedSkills = Object.entries(
    skills.reduce((acc, skill) => {
      const category = (skill?.category || "").trim();

      if (!category) {
        return acc;
      }

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(skill);
      return acc;
    }, {})
  )
    .map(([category, categorySkills]) => [
      category,
      [...categorySkills].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      ),
    ])
    .sort(([a], [b]) => a.localeCompare(b));

  return (
    <section id="skills" className="bg-gray-100 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h2>

        <div className="space-y-8">
          {skills.length === 0 && (
            <p className="text-center text-gray-500">No skills available yet.</p>
          )}

          {groupedSkills.length === 0 && skills.length > 0 && (
            <p className="text-center text-gray-500">
              No categorized skills available yet.
            </p>
          )}

          {groupedSkills.map(([category, categorySkills]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-xl font-semibold text-gray-900">
                {category}
              </h3>

              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill._id || skill.name}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
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
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
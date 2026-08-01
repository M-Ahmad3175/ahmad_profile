import { motion } from "framer-motion";

function Projects({ projects = [] }) {
  return (
    <section id="projects" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <motion.h2
          className="mb-12 text-center text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">

          {projects.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No projects available yet.
            </p>
          )}

          {projects.map((project) => (

            <motion.div
              key={project._id || project.title}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              whileHover={{ scale: 1.03 }}
            >

              <div className="flex aspect-[4/3] items-center justify-center bg-gray-200">
                {project.image ? (
                  <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                ) : (
                  "Project Image"
                )}
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">

                <h3 className="mb-3 text-xl font-bold">
                  {project.title}
                </h3>

                <p className="mb-4 text-sm leading-7 text-gray-600 sm:text-base">
                  {project.shortDescription || project.description}
                </p>

                <p className="mb-6 text-sm font-medium text-blue-600 sm:text-base">
                  {Array.isArray(project.technologies)
                    ? project.technologies.join(" • ")
                    : project.tech || ""}
                </p>

                <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" aria-label={`Open GitHub repository for ${project.title}`} className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                      GitHub
                    </a>
                  )}

                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`Open live demo for ${project.title}`} className="inline-flex w-full items-center justify-center rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-600 hover:text-white sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                      Live Demo
                    </a>
                  )}

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Projects;
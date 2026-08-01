import { motion } from "framer-motion";

function Resume({ resume }) {
  const resumeLink = resume?.resumeUrl || resume?.resume || "#contact";

  return (
    <section
      id="resume"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">

        <motion.h2
          className="mb-6 text-3xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Resume
        </motion.h2>

        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
          Download my latest resume to learn more about
          my education, skills and projects.
        </p>

        {resumeLink === "#contact" ? (
          <p className="text-gray-500">
            Resume is not available right now.
          </p>
        ) : (
          <a
            href={resumeLink}
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
          >
            Download Resume
          </a>
        )}

      </div>
    </section>
  );
}

export default Resume;
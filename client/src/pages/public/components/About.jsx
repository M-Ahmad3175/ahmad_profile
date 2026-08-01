import { motion } from "framer-motion";

function About({ profile, projects = [], skills = [] }) {
  const cards = [
    {
      value: profile?.location || "Lahore, Pakistan",
      label: "Location",
    },
    {
      value: profile?.availableForWork ? "Available" : "Open to talk",
      label: profile?.availableForWork ? "For Work" : "Status",
    },
    {
      value: `${projects.length}+`,
      label: "Projects",
    },
    {
      value: `${skills.length}+`,
      label: "Skills",
    },
  ];

  return (
    <section
      id="about"
      className="bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
        >

          <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
            About Me
          </h2>

          <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-12">

            {/* Left */}

            <div>

              <h3 className="mb-4 text-2xl font-semibold">
                {profile?.professionalTitle || "Full Stack MERN Developer"}
              </h3>

              <p className="leading-8 text-gray-600">
                {profile?.bio || "I am a Software Engineering student passionate about building modern web applications using React, Node.js, Express and MongoDB. I enjoy solving real-world problems and continuously improving my development skills."}
              </p>

            </div>

            {/* Right */}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">

              {cards.map((card) => (
                <div key={card.label} className="rounded-xl border border-gray-200 bg-gray-100 p-5 text-center shadow-sm sm:p-6">
                  <h4 className="text-2xl font-bold text-blue-600 sm:text-3xl">
                    {card.value}
                  </h4>

                  <p className="mt-1 text-sm text-gray-700 sm:text-base">{card.label}</p>
                </div>
              ))}

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}

export default About;
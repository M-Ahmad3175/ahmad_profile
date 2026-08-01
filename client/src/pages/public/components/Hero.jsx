import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiTopcoder } from "react-icons/si";

function Hero({ profile, resume, socialLinks, loading }) {
  const resumeLink = profile?.resume || resume?.resumeUrl || "#resume";
  const socialItems = [
    {
      key: "github",
      label: "GitHub",
      href: socialLinks?.github,
      Icon: FaGithub,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: socialLinks?.linkedin,
      Icon: FaLinkedinIn,
    },
    {
      key: "leetcode",
      label: "LeetCode",
      href: socialLinks?.leetcode,
      Icon: SiLeetcode,
    },
    {
      key: "topcoder",
      label: "TopCoder",
      href: socialLinks?.topcoder,
      Icon: SiTopcoder,
    },
    {
      key: "x",
      label: "X",
      href: socialLinks?.x,
      Icon: FaXTwitter,
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: socialLinks?.whatsapp,
      Icon: FaWhatsapp,
    },
    {
      key: "email",
      label: "Email",
      href: socialLinks?.email,
      Icon: FaEnvelope,
      isEmail: true,
    },
    {
      key: "portfolio",
      label: "Portfolio",
      href: socialLinks?.portfolio,
      Icon: FaGlobe,
    },
  ]
    .map((item) => {
      const rawValue = typeof item.href === "string" ? item.href.trim() : "";

      if (!rawValue) {
        return null;
      }

      if (item.isEmail) {
        return {
          ...item,
          href: rawValue.toLowerCase().startsWith("mailto:") ? rawValue : `mailto:${rawValue}`,
        };
      }

      if (
        rawValue.toLowerCase().startsWith("http://") ||
        rawValue.toLowerCase().startsWith("https://") ||
        rawValue.toLowerCase().startsWith("tel:") ||
        rawValue.toLowerCase().startsWith("mailto:")
      ) {
        return { ...item, href: rawValue };
      }

      if (item.key === "whatsapp") {
        const phoneNumber = rawValue.replace(/\D/g, "");

        if (phoneNumber) {
          return { ...item, href: `https://wa.me/${phoneNumber}` };
        }
      }

      return { ...item, href: `https://${rawValue}` };
    })
    .filter(Boolean);

  return (
    <section
      id="home"
      className="min-h-screen bg-gray-950 pt-24 text-white sm:pt-28"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-3 text-base font-medium text-blue-400 sm:text-lg">
            👋 Hello, I'm
          </p>

          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {profile?.fullName || "Muhammad Ahmad"}
          </h1>

          <h2 className="mb-6 text-xl text-gray-300 sm:text-2xl">
            {profile?.professionalTitle || "Full Stack Developer"}
          </h2>

          <p className="mb-8 text-base leading-7 text-gray-400 sm:text-lg">
            {profile?.bio || "Building modern, responsive and scalable web applications using the MERN Stack."}
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#projects"
              aria-label="View projects section"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              View Projects
            </a>

            <a
              href={resumeLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Download resume"
              className="inline-flex w-full items-center justify-center rounded-lg border border-white/80 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black sm:w-auto"
            >
              Download Resume
            </a>
          </div>

          {socialItems.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {socialItems.map(({ key, label, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open ${label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/90 transition hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="flex h-64 w-64 items-center justify-center rounded-full bg-blue-600 text-7xl shadow-2xl shadow-blue-600/20 sm:h-72 sm:w-72 sm:text-8xl lg:h-80 lg:w-80">
            {loading ? "..." : "👨‍💻"}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiTopcoder } from "react-icons/si";

function Footer({ profile, settings, socialLinks }) {
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
    <footer className="border-t border-white/10 bg-gray-950 py-12 text-white sm:py-14">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {settings?.websiteTitle || profile?.fullName || "Muhammad Ahmad"}
        </h2>

        <p className="mt-3 text-gray-400">
          {profile?.professionalTitle || settings?.websiteDescription || "Full Stack MERN Developer"}
        </p>

        {socialItems.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {socialItems.map(({ key, label, href, Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Open ${label}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-white/25 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}

        <p className="mt-6 text-sm text-gray-500">
          © 2026 {settings?.websiteTitle || profile?.fullName || "Muhammad Ahmad"}.
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
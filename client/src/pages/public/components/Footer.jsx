import { FaEnvelope, FaGithub, FaGlobe, FaLinkedinIn, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiTopcoder } from "react-icons/si";

function Footer({ profile, settings, socialLinks }) {
  const buildSocialItems = (links) => {
    if (Array.isArray(links)) {
      return links
        .filter((item) => item && typeof item === "object" && item.url)
        .map((item, index) => {
          const platform = (item.platform || item.name || `Link ${index + 1}`).toString().trim();
          const rawValue = item.url.toString().trim();
          const normalizedPlatform = platform.toLowerCase();
          const iconConfig = {
            github: { label: "GitHub", Icon: FaGithub },
            linkedin: { label: "LinkedIn", Icon: FaLinkedinIn },
            leetcode: { label: "LeetCode", Icon: SiLeetcode },
            topcoder: { label: "TopCoder", Icon: SiTopcoder },
            x: { label: "X", Icon: FaXTwitter },
            twitter: { label: "X", Icon: FaXTwitter },
            whatsapp: { label: "WhatsApp", Icon: FaWhatsapp },
            email: { label: "Email", Icon: FaEnvelope, isEmail: true },
            portfolio: { label: "Portfolio", Icon: FaGlobe },
          };
          const config = iconConfig[normalizedPlatform] || { label: platform, Icon: FaGlobe };

          if (config.isEmail) {
            return {
              key: `${platform}-${index}`,
              label: config.label,
              href: rawValue.toLowerCase().startsWith("mailto:") ? rawValue : `mailto:${rawValue}`,
              Icon: config.Icon,
            };
          }

          if (
            rawValue.toLowerCase().startsWith("http://") ||
            rawValue.toLowerCase().startsWith("https://") ||
            rawValue.toLowerCase().startsWith("tel:") ||
            rawValue.toLowerCase().startsWith("mailto:")
          ) {
            return {
              key: `${platform}-${index}`,
              label: config.label,
              href: rawValue,
              Icon: config.Icon,
            };
          }

          if (normalizedPlatform === "whatsapp") {
            const phoneNumber = rawValue.replace(/\D/g, "");

            if (phoneNumber) {
              return {
                key: `${platform}-${index}`,
                label: config.label,
                href: `https://wa.me/${phoneNumber}`,
                Icon: config.Icon,
              };
            }
          }

          return {
            key: `${platform}-${index}`,
            label: config.label,
            href: `https://${rawValue}`,
            Icon: config.Icon,
          };
        });
    }

    return [];
  };

  const socialItems = buildSocialItems(socialLinks);

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
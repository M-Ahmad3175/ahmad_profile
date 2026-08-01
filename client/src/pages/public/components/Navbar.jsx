import { Link } from "react-router-dom";

function Navbar({ profile, settings }) {
  const brandName = settings?.websiteTitle || profile?.fullName || "Ahmad";

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-gray-950/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Go to homepage" className="max-w-[60vw] truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {brandName}
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex lg:gap-8">
          <a href="#home" className="text-white/80 transition hover:text-white" aria-label="Navigate to home section">
            Home
          </a>

          <a href="#about" className="text-white/80 transition hover:text-white" aria-label="Navigate to about section">
            About
          </a>

          <a href="#skills" className="text-white/80 transition hover:text-white" aria-label="Navigate to skills section">
            Skills
          </a>

          <a href="#projects" className="text-white/80 transition hover:text-white" aria-label="Navigate to projects section">
            Projects
          </a>

          <a href="#experience" className="text-white/80 transition hover:text-white" aria-label="Navigate to experience section">
            Experience
          </a>

          <a href="#education" className="text-white/80 transition hover:text-white" aria-label="Navigate to education section">
            Education
          </a>

          <a href="#certificates" className="text-white/80 transition hover:text-white" aria-label="Navigate to certificates section">
            Certificates
          </a>

          <a href="#contact" className="text-white/80 transition hover:text-white" aria-label="Navigate to contact section">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
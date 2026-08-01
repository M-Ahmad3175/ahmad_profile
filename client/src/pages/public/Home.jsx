import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Certificates from "./components/Certificates";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { getProfile } from "../../services/profileService";
import { getSkills } from "../../services/skillService";
import projectService from "../../services/projectService";
import experienceService from "../../services/experienceService";
import educationService from "../../services/educationService";
import certificateService from "../../services/certificateService";
import resumeService from "../../services/resumeService";
import settingsService from "../../services/settingsService";
import socialService from "../../services/socialService";

function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [resume, setResume] = useState(null);
  const [settings, setSettings] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeSocialLinks = (value) => {
    if (Array.isArray(value)) {
      return value.find((item) => item && typeof item === "object") || null;
    }

    if (value && typeof value === "object") {
      return value;
    }

    return null;
  };

  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      setError("");

      const [profileRes, skillsRes, projectsRes, experienceRes, educationRes, certificatesRes, resumeRes, settingsRes, socialLinksRes] =
        await Promise.all([
          getProfile(),
          getSkills(),
          projectService.getAll(),
          experienceService.getAll(),
          educationService.getAll(),
          certificateService.getAll(),
          resumeService.getAll(),
          settingsService.getAll(),
          socialService.getAll(),
        ]);

      setProfile(profileRes?.data?.profile || null);
      setSkills(Array.isArray(skillsRes?.data?.skills) ? skillsRes.data.skills : []);
      setProjects(Array.isArray(projectsRes?.data?.projects) ? projectsRes.data.projects : []);
      setExperiences(Array.isArray(experienceRes?.data?.experiences) ? experienceRes.data.experiences : []);
      setEducation(Array.isArray(educationRes?.data?.education) ? educationRes.data.education : []);
      setCertificates(Array.isArray(certificatesRes?.data?.certificates) ? certificatesRes.data.certificates : []);
      const resumeItems = Array.isArray(resumeRes?.data?.resumes) ? resumeRes.data.resumes : [];
      setResume(resumeItems.find((item) => item.isActive) || resumeItems[0] || null);
      setSettings(settingsRes?.data?.settings || null);
      setSocialLinks(normalizeSocialLinks(socialLinksRes?.data?.socialLinks));
    } catch (error) {
      console.error(error);
      setError("Some portfolio data could not be loaded. Showing available content only.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 z-[60] w-full bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white">
          Loading portfolio content...
        </div>
      )}

      {!loading && error && (
        <div className="fixed top-0 left-0 z-[60] w-full bg-amber-500 px-4 py-2 text-center text-sm font-medium text-white">
          {error}
        </div>
      )}

      <Navbar profile={profile} settings={settings} />
      <Hero profile={profile} resume={resume || settings} socialLinks={socialLinks} loading={loading} />
      <About profile={profile} projects={projects} skills={skills} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Education education={education} />
      <Certificates certificates={certificates} />
      <Resume resume={resume || settings} />
      <Contact />
      <Footer profile={profile} settings={settings} socialLinks={socialLinks} />
    </>
  );
}

export default Home;
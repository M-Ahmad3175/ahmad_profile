import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

const Login = lazy(() => import("./pages/auth/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Home = lazy(() => import("./pages/public/Home"));
const Profile = lazy(() => import("./pages/admin/Profile"));
const Skills = lazy(() => import("./pages/admin/Skills"));
const Projects = lazy(() => import("./pages/admin/Projects"));
const Experience = lazy(() => import("./pages/admin/Experience"));
const Education = lazy(() => import("./pages/admin/Education"));
const Certificates = lazy(() => import("./pages/admin/Certificates"));
const Resume = lazy(() => import("./pages/admin/Resume"));
const Settings = lazy(() => import("./pages/admin/Settings"));
const Messages = lazy(() => import("./pages/admin/Messages"));
const SocialLinks = lazy(() => import("./pages/admin/SocialLinks"));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">Loading...</div>}>
        <Routes>

          {/* Public Website */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="experience" element={<Experience />} />
            <Route path="education" element={<Education />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="resume" element={<Resume />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="social-links" element={<SocialLinks />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;


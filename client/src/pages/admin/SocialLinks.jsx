import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { getProfile, updateProfile } from "../../services/profileService";

const initialForm = {
  platform: "",
  url: "",
};

export default function SocialLinks() {
  const [profile, setProfile] = useState(null);
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await getProfile();
      const profileData = response?.data?.profile || response?.data || response;
      setProfile(profileData);
      setLinks(Array.isArray(profileData?.socialLinks) ? profileData.socialLinks : []);
    } catch (error) {
      toast.error("Failed to load social links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.platform.trim() || !form.url.trim()) {
      toast.error("Please provide both a platform and URL");
      return;
    }

    try {
      setSubmitting(true);
      const nextLinks = [
        ...links,
        {
          platform: form.platform.trim(),
          url: form.url.trim(),
          enabled: true,
          order: links.length,
        },
      ];
      const payload = {
        ...(profile || {}),
        socialLinks: nextLinks,
      };
      const response = await updateProfile(payload);
      const savedProfile = response?.data?.profile || response?.data || response;

      setProfile(savedProfile);
      setLinks(Array.isArray(savedProfile?.socialLinks) ? savedProfile.socialLinks : nextLinks);
      setForm(initialForm);
      toast.success("Social link added");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save social link");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (indexToRemove) => {
    try {
      const nextLinks = links.filter((_, index) => index !== indexToRemove);
      const payload = {
        ...(profile || {}),
        socialLinks: nextLinks,
      };
      const response = await updateProfile(payload);
      const savedProfile = response?.data?.profile || response?.data || response;

      setProfile(savedProfile);
      setLinks(Array.isArray(savedProfile?.socialLinks) ? savedProfile.socialLinks : nextLinks);
      toast.success("Social link removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove social link");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="mb-2 text-2xl font-bold">Social Links</h1>
        <p className="mb-6 text-sm text-gray-600">Add and manage the social profiles shown on the public portfolio.</p>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Platform</label>
            <input type="text" value={form.platform} onChange={(event) => setForm((current) => ({ ...current, platform: event.target.value }))} placeholder="GitHub" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">URL</label>
            <input type="url" value={form.url} onChange={(event) => setForm((current) => ({ ...current, url: event.target.value }))} placeholder="https://github.com/username" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : "Add Social Link"}
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="mb-4 text-lg font-semibold">Saved Links</h2>

        {loading ? (
          <p className="text-sm text-gray-500">Loading links...</p>
        ) : links.length === 0 ? (
          <p className="text-sm text-gray-500">No social links added yet.</p>
        ) : (
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={`${link.platform}-${index}`} className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                <div>
                  <p className="font-medium text-gray-900">{link.platform}</p>
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">
                    {link.url}
                  </a>
                </div>
                <Button type="button" onClick={() => handleRemove(index)} className="bg-red-600 hover:bg-red-700">
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
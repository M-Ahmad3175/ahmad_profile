import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
} from "../../services/profileService";

function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      professionalTitle: "",
      location: "",
      bio: "",
      profileImage: "",
    },
  });

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        const profile = response?.data?.profile || response?.data || response;

        reset(profile);
        setProfileImage(profile?.profileImage || "");
        setValue("profileImage", profile?.profileImage || "");
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [reset, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        profileImage: data.profileImage || profileImage,
      };
      const response = await updateProfile(payload);
      const profile = response?.data?.profile || response?.data || response;

      reset(profile);
      setProfileImage(profile?.profileImage || "");
      setValue("profileImage", profile?.profileImage || "");
      toast.success(response.message || "Profile Updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please choose an image first");
      return;
    }

    try {
      setUploading(true);
      const response = await uploadProfileImage(selectedFile);
      const imageUrl = response?.data?.imageUrl || response?.imageUrl || "";
      const currentValues = getValues();
      const payload = {
        ...currentValues,
        profileImage: imageUrl,
      };
      const saveResponse = await updateProfile(payload);
      const profile = saveResponse?.data?.profile || saveResponse?.data || saveResponse;

      reset(profile);
      setProfileImage(profile?.profileImage || imageUrl);
      setValue("profileImage", profile?.profileImage || imageUrl);
      setSelectedFile(null);
      toast.success("Profile image uploaded successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload profile image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      const currentValues = getValues();
      const payload = {
        ...currentValues,
        profileImage: "",
      };
      const response = await updateProfile(payload);
      const profile = response?.data?.profile || response?.data || response;

      reset(profile);
      setProfileImage("");
      setValue("profileImage", "");
      setSelectedFile(null);
      toast.success("Profile image removed");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove profile image");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <h1 className="mb-2 text-2xl font-bold">Profile Settings</h1>
        <p className="mb-6 text-sm text-gray-600">
          Update your personal details shown on the portfolio.
        </p>

        <div className="mb-6 rounded-xl border border-gray-200 p-4">
          <div className="mb-4 flex items-center gap-4">
            {profileImage ? (
              <img src={profileImage} alt="Profile preview" className="h-24 w-24 rounded-full object-cover" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-3xl text-gray-500">
                👤
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-gray-800">Profile Photo</p>
              <p className="text-sm text-gray-500">Upload, replace, or remove your portfolio image.</p>
            </div>
          </div>

          <input type="file" accept="image/*" onChange={(event) => setSelectedFile(event.target.files?.[0] || null)} className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />

          <div className="mt-4 flex flex-wrap gap-3">
            <Button type="button" onClick={handleUpload} disabled={uploading || !selectedFile}>
              {uploading ? "Uploading..." : "Upload Photo"}
            </Button>
            <Button type="button" onClick={handleRemove} className="bg-gray-600 hover:bg-gray-700" disabled={!profileImage || uploading}>
              Remove Photo
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Full Name" name="fullName" register={register} placeholder="Muhammad Ahmad" required />

          <Input label="Email" type="email" name="email" register={register} placeholder="you@example.com" required />

          <Input label="Professional Title" name="professionalTitle" register={register} placeholder="Full Stack MERN Developer" required />

          <Input label="Location" name="location" register={register} placeholder="Lahore, Pakistan" />

          <TextArea label="Bio" name="bio" register={register} placeholder="Write a short professional summary" rows={6} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
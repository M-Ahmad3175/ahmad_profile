import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Button from "../../components/common/Button";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      professionalTitle: "",
      location: "",
      bio: "",
    },
  });

  // Load profile when page opens
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();

        // Fill form with backend data
        reset(response.data || response);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, [reset]);

  // Save profile
  const onSubmit = async (data) => {
    try {
      const response = await updateProfile(data);

      toast.success(response.message || "Profile Updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Card>
        <h1 className="mb-2 text-2xl font-bold">Profile Settings</h1>
        <p className="mb-6 text-sm text-gray-600">
          Update your personal details shown on the portfolio.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Full Name"
            name="fullName"
            register={register}
            placeholder="Muhammad Ahmad"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            register={register}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Professional Title"
            name="professionalTitle"
            register={register}
            placeholder="Full Stack MERN Developer"
            required
          />

          <Input
            label="Location"
            name="location"
            register={register}
            placeholder="Lahore, Pakistan"
          />

          <TextArea
            label="Bio"
            name="bio"
            register={register}
            placeholder="Write a short professional summary"
            rows={6}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Profile"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Profile;
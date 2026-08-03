import api from "./api";

// Get Profile
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (profileData) => {
  const response = await api.put("/profile", profileData);
  return response.data;
};

// Upload a profile image to Cloudinary and receive the image URL.
export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/upload/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
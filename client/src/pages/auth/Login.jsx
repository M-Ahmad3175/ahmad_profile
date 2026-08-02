import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../services/authService";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Runs after successful validation
  const onSubmit = async (data) => {
    try {
      const response = await login(data);

      // Verify the session was actually established by calling /auth/me
      await api.get("/auth/me");

      toast.success(response.message || "Login Successful");

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "80px auto",
      }}
    >
      <h1>Admin Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />

        <br />
        <br />

        {errors.email && (
          <p>{errors.email.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
          })}
        />

        <br />
        <br />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

      </form>
    </div>
  );
}

export default Login;
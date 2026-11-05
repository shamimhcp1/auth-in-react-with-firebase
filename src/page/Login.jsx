import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import {
  loginWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("form data", data);

    try {
      const user = await loginWithEmailAndPassword(data.email, data.password);
      console.log("logged in:", user);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      let user;

      if (provider === "google") {
        user = await signInWithGoogle();
      } else if (provider === "facebook") {
        user = await signInWithFacebook();
      } else {
        throw new Error(`Unsupported provider: ${provider}`);
      }

      console.log("logged in:", user);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <FieldSet label="Login Form">
          <Field label="Email" error={errors.email}>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              className={`border border-gray-300 rounded-md p-2 w-[300px] ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </Field>
          <Field label="Password" error={errors.password}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className={`border border-gray-300 rounded-md p-2 w-[300px] ${errors.password ? "border-red-500" : ""}`}
            />
          </Field>
          {errors.manual && (
            <div className="m-2 text-sm text-red-600">
              {errors.manual.message}
            </div>
          )}
          <Field>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
            >
              Login
            </button>
          </Field>
          <p className="text-sm text-gray-600 my-4 text-center">Social login</p>

          <div className="flex gap-2 w-full">
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Facebook
            </button>
          </div>
        </FieldSet>

        <div className="flex flex-col items-center justify-center my-4 gap-2">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <NavLink to="/register" className="text-blue-500">
              Register
            </NavLink>
          </p>
          {/* forgot password? */}
          <p className="text-sm text-gray-600">
            Forgot your password?{" "}
            <NavLink to="/reset" className="text-blue-500">
              Reset Password
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}

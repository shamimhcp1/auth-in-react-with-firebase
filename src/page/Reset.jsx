import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import { sendPasswordReset } from "../firebase";

export default function Reset() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("form data", data);

    try {
      await sendPasswordReset(data.email);
      console.log("Password reset email sent.");
      alert("Password reset email sent. Please check your inbox.");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-md shadow-md"
      >
        <FieldSet label="Reset Password Form">
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
              Send Password Reset Email
            </button>
          </Field>
        </FieldSet>
        <p className="text-sm text-gray-600 m-4">
          Remember your password?{" "}
          <NavLink to="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

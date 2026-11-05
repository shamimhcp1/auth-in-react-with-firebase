import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import { registerWithEmailAndPassword } from "../firebase";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("form data", data);

    try {
        const user = await registerWithEmailAndPassword(data.email, data.password);
        console.log("registered:", user);
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
        <FieldSet label="Register Form">
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
              Register
            </button>
          </Field>
        </FieldSet>
        <p className="text-sm text-gray-600 m-4">
          Already have an account?{" "}
          <NavLink to="/login" className="text-blue-500">
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
}

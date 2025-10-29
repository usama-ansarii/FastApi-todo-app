import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginSchema } from "../schema";
import { ApiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const res = await ApiRequest.login(values);

          if (!res.data.token) {
            toast.error(res.data.detail || "Login failed!");
            return;
          }

          const { token, user } = res?.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          toast.success("Login successful!");
          navigate("/add-todo");
          action.resetForm();
        } catch (error) {
          console.error("error:", error);
          toast.error(
            "Invalid email or password!"
          );
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <div className="form-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <div className="error">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password && (
            <div className="error">{errors.password}</div>
          )}
        </div>

        <button type="submit" className="btn">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="bottom-text">
        Create an account?{" "}
        <Link to="/signup" className="login-link">
          Signup
        </Link>
      </p>
    </div>
  );
}

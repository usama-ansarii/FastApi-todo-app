import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../schema";
import { ApiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
};

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signupSchema,
      onSubmit: async (values, action) => {
        try {
          setLoading(true);
          const res = await ApiRequest.signup(values);
          console.log("res::", res);
          toast.success("Signup Successfully");
          action.resetForm();
          navigate("/login");
        } catch (error) {
          console.error("error::",error)
          toast.error("Signup failed")
        }finally{
          setLoading(false)
        }
      },
    });

  return (
    <div className="form-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            value={values.fullname}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.fullname && touched.fullname && (
            <div className="error">{errors.fullname}</div>
          )}
        </div>

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

        <button className="btn" type="submit">
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>

      <p className="bottom-text">
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
    </div>
  );
}

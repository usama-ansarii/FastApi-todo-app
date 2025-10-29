import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { todoSchema } from "../schema";
import { ApiRequest } from "../services/ApiRequest";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const initialValues = {
  task: "",
  description: "",
};

function AddTodo() {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: todoSchema,
    onSubmit: async (values, action) => {
      try {
        setLoading(true);
        if (isEdit) {
          await ApiRequest.updateTodo(id, values);
          toast.success("Todo updated successfully!");
        } else {
          await ApiRequest.addTodo(values);
          toast.success("Todo added Successfully");
        }

        action.resetForm();
        navigate("/todolist");
      } catch (error) {
        console.error("error::", error);
        toast.error("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        setIsEdit(true);
        try {
          const res = await ApiRequest.getSingleTodo(id);
          const todo = res?.data;
          setValues({
            task: todo.task,
            description: todo.description,
          });
        } catch (error) {
          toast.error("Error fetching todo!");
        }
      }
    };
    fetchTodo();
  }, [id, setValues]);

  return (
    <div className="form-container">
      <h2>{isEdit ? "Edit Todo" : "Add a New Todo"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Task</label>
          <input
            type="text"
            name="task"
            placeholder="Enter task title"
            value={values.task}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.task && touched.task ? (
            <div className="error">{errors.task}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter task description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.description && touched.description ? (
            <div className="error">{errors.description}</div>
          ) : null}
        </div>

        <button className="btn" type="submit">
          {loading? isEdit? "Updating...": "Adding...": isEdit? "Update Todo": "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default AddTodo;

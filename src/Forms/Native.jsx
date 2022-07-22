import react from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
export const NativeLogin = () => {
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    phone: yup
      .string()
      .min(10, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    age: yup
      .number()
      .min(1, "Min value is 1")
      .max(100, "Max value is 100")
      .required("Required")
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      phone: ""
    },
    validationSchema: validationSchema,
    onSubmit: function (values) {
      console.log(values);
      axios
        .post("http://localhost:4000/employee", values)
        .then((res) => {
          console.log("RES", res);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label> <br />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && Boolean(formik.errors.name) ? (
            <div className="yup">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="email">Eamil</label>
          <br />
          <input
            type="text"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />{" "}
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <div className="yup">{formik.errors.email}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="Phone">Phone</label>
          <br />
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />{" "}
          {formik.touched.phone && Boolean(formik.errors.phone) ? (
            <div className="yup">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div>
          <label htmlFor="Age">Age</label>
          <br />
          <input
            type="text"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
          />{" "}
          {formik.touched.age && Boolean(formik.errors.age) ? (
            <div className="yup">{formik.errors.age}</div>
          ) : null}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

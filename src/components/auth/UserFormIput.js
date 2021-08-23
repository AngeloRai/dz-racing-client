import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";


import InputFeedback from "../InputFeedback";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Not a valid e-mail").required("Required field"),
  password: Yup.string().min(6).required("Required field"),
});

function UserFormIput({ handleSubmit }) {

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await handleSubmit(values)
          setSubmitting(false);
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <div className="form-group">
            <label htmlFor="signupFormEmail">Email address</label>
            <Field
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : "is-valid"
              }`}
              id="signupFormEmail"
              aria-describedby="emailHelp"
              name="email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <InputFeedback invalid={errors.email && touched.email}>
                  {msg}
                </InputFeedback>
              )}
            />
            {errors.email && touched.email ? null : (
              <small id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="signupFormPassword">Password</label>
            <Field
              type="password"
              className={`form-control ${
                errors.password && touched.password ? "is-invalid" : "is-valid"
              }`}
              id="signupFormPassword"
              name="password"
            />
            <ErrorMessage
              name="password"
              render={(msg) => (
                <InputFeedback invalid={errors.password && touched.password}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>
         
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span>Submitting</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </button>

         
        </Form>
      )}
    </Formik>
  );
}

export default UserFormIput;

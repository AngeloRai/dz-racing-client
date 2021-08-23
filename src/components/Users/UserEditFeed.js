import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputFeedback from "../InputFeedback";
function UserEditFeed({ user, handleSubmit }) {
  
  const userValidation = Yup.object().shape({
    email: Yup.string().email().required("Please inform email"),
    role: Yup.string().required("Please inform role"),
  });
  console.log(user);
  return (
    
    <div>
        <Formik
          initialValues={{
            email: user.email,
            role: user.role,
          }}
          validationSchema={userValidation}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(user.id, values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="main-payment-div">
              <div className="card-info-box ">
                <div className="form-group m-1 p-2">
                  <label htmlFor="registeremail">Email</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.email && touched.email ? "is-invalid" : "is-valid"
                    }`}
                    id="registeremail"
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
                </div>
               
                <div className="form-group m-1 p-2">
                  <label htmlFor="inputFormRole">Role</label>
                  <Field
                    as="select"
                    className="field-box fields form-control"
                    id="inputFormRole"
                    name="role"
                  >

                    <option value="N/A"></option>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </Field>
                    <span className="">Current Status: <strong>{user.role}</strong></span>
                  <ErrorMessage
                    name="role"
                    render={(msg) => (
                      <InputFeedback invalid={errors.role && touched.role}>
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
              </div>

             
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting}
                  style={{width: "119px"}}
                >
                  <div>
                    {isSubmitting ? (
                      <span>Loading</span>
                    ) : (
                      <span>EDIT USER</span>
                    )}
                  </div>
                </button>
                
              
            </Form>
          )}
        </Formik>
      
    </div>
  );
}

export default UserEditFeed;

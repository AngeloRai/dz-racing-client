import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import InputFeedback from "./InputFeedback";

function CircuitFeed(props) {
  const circuitValidation = Yup.object().shape({
    name: Yup.string().max(100).required("Please inform a circuit name"),
    city: Yup.string().max(100).required("Please inform a city"),
  });
  console.log(props.state);
  return (
    <div>
      {props.state.name !== null && <Formik
        initialValues={{
          name: props.state.name,
          city: props.state.city,
        }}
        validationSchema={circuitValidation}
        onSubmit={(values, { setSubmitting }) => {
          const treatedValues = {...values, name: values.name.trim()}
          
          props.handleSubmit(treatedValues);
  
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="main-payment-div">
            <div className="card-info-box ">
              <div className="payment-title h3 m-2">CIRCUIT DATA</div>
  
              <div className="form-group m-4 w-75">
                <label htmlFor="registerName">Circuit Name:</label>
                <Field
                  placeholder="Inform a circuit name"
                  type="text"
                  className={`fields form-control ${
                    errors.name && touched.name ? "is-invalid" : "is-valid"
                  }`}
                  id="registerName"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  render={(msg) => (
                    <InputFeedback invalid={errors.name && touched.name}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
              <div className="form-group m-4 w-75">
                <label htmlFor="registerCity">Circuit city:</label>
                <Field
                  placeholder="Inform a circuit city"
                  type="text"
                  className={`fields form-control ${
                    errors.city && touched.city ? "is-invalid" : "is-valid"
                  }`}
                  id="registerCity"
                  name="city"
                />
                <ErrorMessage
                  name="city"
                  render={(msg) => (
                    <InputFeedback invalid={errors.city && touched.city}>
                      {msg}
                    </InputFeedback>
                  )}
                />
              </div>
            </div>
            <div className="d-flex justify-content-around w-75 m-4">
              <button
                type="submit"
                className="btn btn-secondary"
                style={{width: "78px"}}
                disabled={isSubmitting}
              >
                <div>
                  {isSubmitting ? <span>Loading</span> : <span>SEND</span>}
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>}
    </div>
  );
}

export default CircuitFeed;

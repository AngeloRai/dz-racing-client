import * as Yup from "yup";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./PilotFeed.css";
import InputFeedback from "../InputFeedback";

function PilotFeed(props) {
  const pilotValidation = Yup.object().shape({
    firstName: Yup.string().max(100).required("Please inform first name"),
    lastName: Yup.string().max(100).required("Please inform last name"),
    teamId: Yup.string().required("Please select a team."),
    isActive: Yup.string().required("Please define pilot status"),
  });

  return (
    <div>
      {props.state.firstName && (
        <Formik
          initialValues={{
            firstName: props.state.firstName,
            lastName: props.state.lastName,
            teamId: props.state.teamId,
            teamName: props.state.teamName,
            isActive: props.state.isActive === true ? "true" : "false",
          }}
          validationSchema={pilotValidation}
          onSubmit={(values, { setSubmitting }) => {
            const treatedValues = {
              ...values,
              firstName: values.firstName.trim(),
              teamId: Number(values.teamId),
              isActive: values.isActive === "true" ? true : false,
            };

            props.handleSubmit(treatedValues);

            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors, touched, values }) => (
            <Form className="main-payment-div">
              <div className="card-info-box ">
                <div className="form-group m-4">
                  <label htmlFor="registerFirstName">First name</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.firstName && touched.firstName
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                    id="registerFirstName"
                    name="firstName"
                  />
                  <ErrorMessage
                    name="firstName"
                    render={(msg) => (
                      <InputFeedback
                        invalid={errors.firstName && touched.firstName}
                      >
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                <div className="form-group m-4">
                  <label htmlFor="registerLastName">Last name</label>
                  <Field
                    type="text"
                    className={`field-box fields form-control ${
                      errors.lastName && touched.lastName
                        ? "is-invalid"
                        : "is-valid"
                    }`}
                    id="registerLastName"
                    name="lastName"
                  />
                  <ErrorMessage
                    name="lastName"
                    render={(msg) => (
                      <InputFeedback
                        invalid={errors.lastName && touched.lastName}
                      >
                        {msg}
                      </InputFeedback>
                    )}
                  />
                </div>
                <div className="form-group m-4">
                  <label htmlFor="registerTeamName">Team</label>
                  <Field
                    as="select"
                    type="text"
                    className="field-box fields form-control is-valid"
                    id="registerTeamName"
                    name="teamId"
                  >
                    <option value={props.state.teamId}>
                      {props.state.teamName}
                    </option>
                    {props.teams &&
                      props.teams.map((team) => (
                        <option
                          type="number"
                          value={Number(team.id)}
                          key={team.id}
                        >
                          {team.name}
                        </option>
                      ))}
                  </Field>
                </div>
                <div id="my-radio-group">Pilot Status</div>
                <div role="group" aria-labelledby="my-radio-group">
                  <label className="m-2">
                    <Field
                      className="mx-2"
                      type="radio"
                      name="isActive"
                      value="true"
                    />
                    Pilot is Active
                  </label>
                  <label className="m-2">
                    <Field
                      className="mx-2"
                      type="radio"
                      name="isActive"
                      value="false"
                    />
                    Pilot is not Active
                  </label>
                  <div><strong>ACTIVE:</strong> {values.isActive === "true" ? <span>Yes</span> : <span>No</span>}</div>
                </div>
              </div>

              <div className="edit-buttons-box">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={isSubmitting || !values.firstName || !values.lastName || !values.teamId}
                >
                  {props.isDeleteComponent ? (
                    <div>
                      {isSubmitting ? (
                        <span>Loading</span>
                      ) : (
                        <span>UPDATE</span>
                      )}
                    </div>
                  ) : (
                    <div>
                      {" "}
                      {isSubmitting ? (
                        <span>Loading</span>
                      ) : (
                        <span>ADD PILOT</span>
                      )}
                    </div>
                  )}
                </button>
                {props.isDeleteComponent && (
                  <div
                    className="col-1 btn btn-danger w-50"
                    onClick={props.onClick}
                  >
                    DELETE PILOT
                  </div>
                )}
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default PilotFeed;

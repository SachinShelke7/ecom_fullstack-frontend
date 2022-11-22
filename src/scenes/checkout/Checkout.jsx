import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Steps, Step, Stepper, StepLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { shades } from "../../theme";
import Shipping from "./Shipping";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51M6S4ySCEkVRqb1QO3lvaQeNuK5eWTS6VsJObFtA8CtlZupCIbQuCc1vQ8UDkq5mkdzOVFBOpE4q8YKzIvLSr5aR0090wUM8h8"
);
const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirst = activeStep === 0;
  const isSecond = activeStep === 1;
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length <= 0) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    //billing address onto shipping address
    if (isFirst && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecond) {
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch("http://localhost:1337/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      {cart.length ? (
        <>
          <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
            <Step>
              <StepLabel>Billing</StepLabel>
            </Step>
            <Step>
              <StepLabel>Payment</StepLabel>
            </Step>
          </Stepper>
          <Box>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema[activeStep]}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  {isFirst && (
                    <Shipping
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {isSecond && (
                    <Payment
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleBlur={handleBlur}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  <Box display="flex" justifyContent="space-between" gap="50px">
                    {isSecond ? (
                      <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        sx={{
                          backgroundColor: shades.primary[200],
                          boxShadow: "none",
                          color: "white",
                          borderRadius: 0,
                          padding: "15px 40px",
                        }}
                        onClick={() => setActiveStep(activeStep - 1)}
                      >
                        Back
                      </Button>
                    ) : null}
                    <Button
                      fullWidth
                      type="submit"
                      color="primary"
                      variant="contained"
                      sx={{
                        backgroundColor: shades.primary[400],
                        boxShadow: "none",
                        color: "white",
                        borderRadius: 0,
                        padding: "15px 40px",
                      }}
                    >
                      {isFirst ? "Next" : "Place Order"}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default Checkout;

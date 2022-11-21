import React from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import AddressForm from "./AddressForm";

const Shipping = ({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
}) => {
  return (
    <Box m="30px auto">
      {/* billing form */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px ">
          Billing Information
        </Typography>
        <AddressForm
          type="billingAddress"
          values={values.billingAddress}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Box>

      <Box mb="20px">
        <FormControlLabel
          label="Same from Shipping Address"
          control={
            <Checkbox
              defaultChecked
              value={values.shippingAddress.isSameAddress}
              onChange={() => {
                setFieldValue(
                  "shippingAddress.isSameAddress",
                  !values.shippingAddress.isSameAddress
                );
              }}
            />
          }
        />
      </Box>
      {/* Shipping Form */}
      {!values.shippingAddress.isSameAddress && <Box>test</Box>}
    </Box>
  );
};

export default Shipping;

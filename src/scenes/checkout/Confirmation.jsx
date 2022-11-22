import React from "react";
import { Box, Alert, AlertTitle } from "@mui/material";

const Confirmation = () => {
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You Have Successfully Made an Order -{" "}
        <strong>Congratulations on making your purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;

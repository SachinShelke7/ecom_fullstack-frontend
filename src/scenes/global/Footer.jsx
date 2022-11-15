import React from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { shades } from "../../theme";

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box
      mt="70px"
      p="40px 0"
      backgroundColor={neutral.light}
      sx={{ userSelect: "none" }}
    >
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px,30px,40px"
      >
        <Box width="clamp(20%,30%,40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            FANCY E-STORE
          </Typography>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            corporis iusto sunt rerum voluptatibus a laudantium facilis
            reiciendis aut quasi dolore voluptates ea, sint quae excepturi vero
            tempore ad nulla?
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Careers
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Our Stores
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Terms & Condition
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Privacy & Policy
          </Typography>
        </Box>
        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Customer Care
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Help Center
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Track Your Order
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Corporate & Bulk Purchasing
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Returns & Refunds
          </Typography>
        </Box>

        <Box width="clamp(20%,25%,30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            47 xyz,India,123456
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            Email : abc@xyz.com
          </Typography>
          <Typography mb="30px" sx={{ cursor: "pointer" }}>
            (+91) 1234567890
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

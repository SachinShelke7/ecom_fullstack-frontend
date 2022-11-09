import { Box } from "@mui/material";
import React from "react";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";

const Home = () => {
  return (
    <Box>
      <MainCarousel />
      <ShoppingList />
    </Box>
  );
};

export default Home;

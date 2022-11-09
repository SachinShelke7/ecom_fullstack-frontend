import { Box } from "@mui/material";
import React from "react";
import MainCarousel from "./MainCarousel";
import ShoppingList from "./ShoppingList";
import Subscribe from "./Subscribe";

const Home = () => {
  return (
    <Box>
      <MainCarousel />
      <ShoppingList />
      <Subscribe />
    </Box>
  );
};

export default Home;

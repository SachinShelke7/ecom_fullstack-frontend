import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Close, Add, Remove } from "@mui/icons-material";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = 0;
  //   const totalPrice = cart.reduce((total, item) => {
  //     return total + item.count * item.attributes.price;
  //   });

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0,0,0,0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      top="0"
      left="0"
      right="0"
      overflow="auto"
    >
      {/* modal */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px,30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* header */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING CART ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <Close />
            </IconButton>
          </FlexBox>

          {/* cart items */}
          <Box>
            {cart.map((item) => {
              return (
                <Box key={`${item.attributes.name}-${item.id}`}>
                  <FlexBox p="15px 0">
                    <Box flex="1 1 40%">
                      <img
                        alt={item?.name}
                        width="123px"
                        height="164px"
                        src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    </Box>
                    <Box flex="1 1 60%">
                      <FlexBox mb="5px">
                        <Typography fontWight="bold">
                          {item.attributes.name}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(removeFromCart({ id: item.id }))
                          }
                        >
                          <Close />
                        </IconButton>
                      </FlexBox>
                      <Typography>
                        {item.attributes.shortDescription}
                      </Typography>

                      <FlexBox m="15px 0 ">
                        <Box
                          display="flex"
                          alignItems="center"
                          border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          <IconButton
                            onClick={() =>
                              dispatch(decreaseCount({ id: item.id }))
                            }
                          >
                            <Remove />
                          </IconButton>
                          <Typography>{item.count}</Typography>
                          <IconButton
                            onClick={() =>
                              dispatch(increaseCount({ id: item.id }))
                            }
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        {/* price */}
                        <Typography fontWeight="bold">
                          ${item.attributes.price}
                        </Typography>
                      </FlexBox>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              );
            })}
          </Box>

          {/* actions */}
          <Box margin="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;

import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { logOut } from "../../store/auth/authThunk";
import { snackbarActions } from "../../store/snackbar";

export const AdminHeader = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logOut());
    dispatch(snackbarActions.doSuccess("Successfully logged out"));
  };

  return (
    <HeaderStyle>
      <Container>
        <MealsText>Meals</MealsText>

        <Button variant="contained" onClick={logoutHandler}>
          Log out
        </Button>
      </Container>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  width: 100%;
  height: 101px;
  background-color: #8a2b06;
  padding: 22px 120px;
  color: #ffffff;
  top: 0;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MealsText = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 38px;
  line-height: 57px;
  color: #ffffff;
`;

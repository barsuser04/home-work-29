import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ModalMui } from "../UI/modal/Modal";
import { useDispatch } from "react-redux";
import { editFoodsRequest } from "../../store/foods/foodsThunk";
import { snackbarActions } from "../../store/snackbar";
import styled from "styled-components";

export const EditFoods = ({ editData, toggle, onClick }) => {
  const [editTitle, setEditTitle] = useState(editData.title);
  const [editDescription, setEditDescription] = useState(editData.description);
  const [editPrice, setEditPrice] = useState(editData.price);
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setEditDescription(e.target.value);
  };

  const onChangePrice = (e) => {
    setEditPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: editTitle,
      description: editDescription,
      price: +editPrice,
      id: editData._id,
    };

    dispatch(editFoodsRequest(data));
    onClick(false);
    dispatch(snackbarActions.doSuccess("Successfully saved"));
  };

  return (
    <ModalMui toggle={toggle} onClick={onClick}>
      <Form onSubmit={submitHandler}>
        <StyledTextField
          label="Title"
          value={editTitle}
          onChange={onChangeTitle}
        />
        <StyledTextField
          label="Description"
          value={editDescription}
          onChange={onChangeDescription}
        />
        <StyledTextField
          label="Price"
          value={editPrice}
          onChange={onChangePrice}
        />
        <ButtonWrapper>
          <Button variant="contained" type="submit">
            Save
          </Button>
          <CancelButton variant="contained" onClick={() => onClick(false)}>
            Cancel
          </CancelButton>
        </ButtonWrapper>
      </Form>
    </ModalMui>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
`;

const CancelButton = styled(Button)`
  color: #fff;
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

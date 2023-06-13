import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addFoodsRequest,
  deleteFoodsRequest,
} from "../../store/foods/foodsThunk";
import { getFoods } from "../../store/meals/mealsThunk";
import { Button, TextField } from "@mui/material";
import { ModalMui } from "../UI/modal/Modal";
import { EditFoods } from "./EditFoods";
import { snackbarActions } from "../../store/snackbar";

const AddFoods = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.meals);

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      title: data.title,
      description: data.description,
      price: +data.price,
    };
    dispatch(addFoodsRequest(newData));
    setData({
      title: "",
      description: "",
      price: "",
    });
    setOpenModal(false);
    dispatch(snackbarActions.doSuccess("Successfully added"));
  };

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteFoodsRequest(id));
  };

  const openModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  const openEditModalHandler = () => {
    setEditOpenModal((prev) => !prev);
  };

  const editHandler = (data) => {
    setEditData(data);
    openEditModalHandler();
  };

  return (
    <>
      {editOpenModal && (
        <EditFoods
          toggle={editOpenModal}
          onClick={openEditModalHandler}
          editData={editData}
        />
      )}
      <Wrapper>
        {openModal ? (
          <ModalMui toggle={openModal} onClick={openModalHandler}>
            <Container>
              <Form onSubmit={submitHandler}>
                <StyledTextField
                  variant="filled"
                  label="Title"
                  value={data.title}
                  placeholder="Title"
                  name="title"
                  onChange={onChangeHandler}
                />
                <StyledTextField
                  variant="filled"
                  label="Description"
                  value={data.description}
                  placeholder="Description"
                  name="description"
                  onChange={onChangeHandler}
                />
                <StyledTextField
                  variant="filled"
                  value={data.price}
                  label="Price"
                  placeholder="Price"
                  name="price"
                  onChange={onChangeHandler}
                />
                <ButtonWrapper>
                  <Button variant="contained" type="submit">
                    Add
                  </Button>
                  <Button variant="contained" onClick={openModalHandler}>
                    Cancel
                  </Button>
                </ButtonWrapper>
              </Form>
            </Container>
          </ModalMui>
        ) : (
          <Button variant="contained" onClick={openModalHandler}>
            Add Product
          </Button>
        )}

        <FoodsList>
          {meals.map((el) => (
            <FoodBlock key={el._id}>
              <FoodTitle>{el.title}</FoodTitle>
              <FoodDescription>{el.description}</FoodDescription>
              <FoodPrice>{el.price} $</FoodPrice>
              <ButtonWrapper>
                <DeleteButton
                  variant="outlined"
                  onClick={() => deleteHandler(el._id)}
                >
                  Delete
                </DeleteButton>
                <EditButton variant="outlined" onClick={() => editHandler(el)}>
                  Edit
                </EditButton>
              </ButtonWrapper>
            </FoodBlock>
          ))}
        </FoodsList>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const StyledTextField = styled(TextField)`
  width: 100%;
`;

const FoodsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
`;

const FoodBlock = styled.div`
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const FoodTitle = styled.h2`
  font-size: 20px;
  margin: 0;
  color: #333;
`;

const FoodDescription = styled.h3`
  font-size: 16px;
  margin: 10px 0;
  color: #555;
`;

const FoodPrice = styled.h4`
  font-size: 18px;
  margin: 0;
  color: #222;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled(Button)`
  color: #f44336;
  border-color: #f44336;
  margin-right: 10px;

  &:hover {
    color: #fff;
    background-color: #f44336;
  }
`;

const EditButton = styled(Button)`
  color: #2962ff;
  border-color: #2962ff;

  &:hover {
    color: #fff;
    background-color: #2962ff;
  }
`;

export default AddFoods;

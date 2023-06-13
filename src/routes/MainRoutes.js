import React from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { UsersLayout } from "../layout/UsersLayout";
import { MealLayout } from "../layout/MealLayout";
import { Admin } from "../pages/Admin";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { USERS_ROLE } from "../constants";

export const MainRoutes = () => {
  const role = useSelector((state) => state.auth.user.role);
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoutes
            component={UsersLayout}
            isAllowed={["USER", "GUEST"].includes(role)}
            fallBbackPath={"/admin"}
          />
        }
      >
        <Route
          index
          element={
            <ProtectedRoutes
              component={MealLayout}
              isAllowed={["USER", "GUEST"].includes(role)}
              fallBbackPath={"/admin"}
            />
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoutes
              component={SignIn}
              isAllowed={["USER", "GUEST"].includes(role)}
              fallBbackPath={role === USERS_ROLE.ADMIN ? "/admin" : "/"}
            />
          }
        />
        <Route
          path="signup"
          element={
            <ProtectedRoutes
              component={SignUp}
              isAllowed={["USER", "GUEST"].includes(role)}
              fallBbackPath={role === USERS_ROLE.ADMIN ? "/admin" : "/"}
            />
          }
        />
      </Route>
      <Route path="/admin" element={
        <ProtectedRoutes
        component={Admin}
        isAllowed={[USERS_ROLE.ADMIN].includes(role)}
        fallBbackPath='/'
      />
      } />
      <Route path='*' element={<h1>NOT FOUND</h1> }/>
    </Routes>
  );
};

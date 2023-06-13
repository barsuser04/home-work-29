import React from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import AddFoods from "../components/admin/AddFoods";

export const AdminLayout = () => {
  return (
    <div>
      <AdminHeader></AdminHeader>
      <div>
        <AddFoods />
      </div>
    </div>
  );
};

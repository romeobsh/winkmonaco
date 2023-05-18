import React from "react";
import { signOut } from "next-auth/react";

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Admin;

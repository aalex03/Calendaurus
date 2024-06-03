import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const navigation = useNavigate();
  return <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
    <Button onClick={() => navigation("/home")}>Login</Button>
  </div>;
}
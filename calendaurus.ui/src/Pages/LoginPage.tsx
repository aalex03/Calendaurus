import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export type LoginProps = {
  signIn : () => void
}

export const LoginPage = (props : LoginProps) => {
  const navigation = useNavigate();
  return <div style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
    <Button onClick={props.signIn}>Login</Button>
  </div>;
}
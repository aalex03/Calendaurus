import { BrandingWatermark } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import banner from "../banner.svg"
export type LoginProps = {
  signIn : () => void
}

export const LoginPage = (props : LoginProps) => {
  const navigation = useNavigate();
  return <Container style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem" }}>
    <img
				src={banner}
				className="App-logo"
				alt="logo"
        style={{maxWidth: "40rem"}}
			/>
    <Button variant="outlined" onClick={props.signIn}>Login</Button>
  </Container>;
}
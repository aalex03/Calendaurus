import { Button } from "@mui/material";
import { useState } from "react";
type Props = {
  name: string;
  lastName: string;
}
export const LoginPage = (props: Props) => {
  const [counter, setCounter] = useState(0);
  return <div style={{ display: "flex", flexDirection: "column-reverse", padding: "1rem" }}>
    <h1>Login, {props.name}</h1>
    <Button id="LoginButton" variant="contained" color="primary" style={{backgroundColor:(counter%2==0 ? "red" : "blue"), height: counter*10+"px"}}onClick={() => { setCounter(counter + 1); }}>Login tries: {counter}</Button>
  </div>;
}
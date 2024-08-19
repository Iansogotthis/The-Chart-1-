import React from "react";
import { signInWithGoogle } from "./auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const user = await signInWithGoogle();
    navigate("/profile", { state: { user } });
  };
  return <button onClick={handleLogin}>Login with Google</button>;
};

export default Login;
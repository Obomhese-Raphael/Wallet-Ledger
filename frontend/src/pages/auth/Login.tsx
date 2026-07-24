import { useEffect } from "react";
import { login } from "../../services/auth.service";

const Login = () => {
  useEffect(() => {
    login({
      email: "raphael@example.com",
      password: "Password123!",
    })
      .then(console.log)
      .catch(console.error);
  }, []);

  return <h1>Login</h1>;
};

export default Login;

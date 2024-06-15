import { useEffect, useState, MouseEvent } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Axios from "../../lib/Axios";
import { LoginState } from "../../types";
import Logo from "../../components/Icons/Logo";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import emailValidator from "../../lib/emailValidator";
import { isNotAuthenticated } from "../../lib/useToken";
import { ToastTypes, useToast } from "../../lib/useToast";
import AuthLayout from "../../components/Layout/AuthLayout";

const Login = () => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState<LoginState>({
    email: "",
    password: "",
  });

  useEffect(() => {
    isNotAuthenticated(navigate);
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!emailValidator(login.email)) {
      Toast("Please enter a valid email address.", ToastTypes.ERROR);
      return;
    }

    setIsLoading(true);
    Axios.post("/auth/login", {
      email: login.email,
      password: login.password,
    })
      .then((res) => {
        if (res) {
          Toast("Logged in", ToastTypes.SUCCESS);
          setTimeout(() => {
            navigate({ to: "/dashboard" });
          }, 3000);
        } else {
          console.error("Invalid response:", res);
          Toast("Invalid response from server", ToastTypes.ERROR);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          Toast(err.response.data.message, ToastTypes.ERROR);
        } else {
          console.error("Invalid error response:", err);
          Toast("Invalid error response from server", ToastTypes.ERROR);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      <Logo />
      <div className="flex flex-col gap-3 w-full justify-center items-center">
        <div className="w-full grid gap-2">
          <label className="text-slate-800" htmlFor="email">
            Email
          </label>
          <Input
            type="text"
            name="name"
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
          />
        </div>

        <div className="w-full grid gap-2">
          <label className="text-slate-800" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleShowPassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <Link
            to="/auth/register"
            className="text-green-500 hover:text-green-800 text-[12px]"
          >
            Don't have an account? Register
          </Link>
        </div>

        {isLoading ? (
          <Button
            disabled
            className="bg-green-500 text-white opacity-[0.6] hover:opacity-[0.6]"
          >
            Logging in...
          </Button>
        ) : (
          <Button className="bg-green-500 text-white" onClick={handleSubmit}>
            Login
          </Button>
        )}
      </div>
    </AuthLayout>
  );
};

export default Login;

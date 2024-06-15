import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Axios from "../../lib/Axios";
import { RegisterState } from "../../types";
import Logo from "../../components/Icons/Logo";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import emailValidator from "../../lib/emailValidator";
import { isNotAuthenticated } from "../../lib/useToken";
import { ToastTypes, useToast } from "../../lib/useToast";
import AuthLayout from "../../components/Layout/AuthLayout";

const Register = () => {
  const navigate = useNavigate();

  const { Toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState<RegisterState>({
    user: {
      name: "",
    },
    email: "",
    password: "",
  });

  useEffect(() => {
    isNotAuthenticated(navigate);
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!register.user.name.trim()) {
      Toast("Please enter your name.", ToastTypes.ERROR);
      return;
    }

    if (!emailValidator(register.email)) {
      Toast("Please enter a valid email address.", ToastTypes.ERROR);
      return;
    }

    if (register.password.length < 8) {
      Toast("Password must be at least 8 characters long.", ToastTypes.ERROR);
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", register.user.name);
    formData.append("email", register.email);
    formData.append("password", register.password);

    Axios.post("/auth/register", formData)
      .then((res) => {
        if (res && res.data) {
          Toast(res.data, ToastTypes.SUCCESS);
        } else {
          console.error("Invalid response:", res);
          Toast("Invalid response from server", ToastTypes.ERROR);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          Toast(err.response.data, ToastTypes.ERROR);
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
          <label className="text-slate-800" htmlFor="name">
            Name
          </label>

          <Input
            type="text"
            name="name"
            onChange={(e) =>
              setRegister((prevState) => ({
                ...prevState,
                user: {
                  ...prevState.user,
                  name: e.target.value,
                },
              }))
            }
          />
        </div>
        <div className="w-full grid gap-2">
          <label className="text-slate-800" htmlFor="email">
            Email
          </label>
          <Input
            type="email"
            name="email"
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
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
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={toggleShowPassword}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <Link
            to="/auth/login"
            className="text-green-500 hover:text-green-800 text-[12px]"
          >
            Already have an account? Login
          </Link>
        </div>
        {isLoading ? (
          <Button
            disabled
            className="bg-green-500 text-white opacity-[0.6] hover:opacity-[0.6]"
          >
            Registering...
          </Button>
        ) : (
          <Button className="bg-green-500 text-white" onClick={handleSubmit}>
            Register
          </Button>
        )}
      </div>
    </AuthLayout>
  );
};

export default Register;

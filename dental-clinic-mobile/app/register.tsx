import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

import Axios from "@/lib/Axios";
import Toast from "react-native-toast-message";
import { isNotAuthenticated } from "@/lib/useToken";
import { AntDesign, Feather } from "@expo/vector-icons";

type RegisterState = {
  user: {
    name: string;
    avatarUrl?: File | null;
  };
  email: string;
  password: string;
};
export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const register = () => {
  const router = useRouter();

  useEffect(() => {
    isNotAuthenticated(router);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [register, setRegister] = useState<RegisterState>({
    user: {
      name: "",
    },
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!register.user.name.trim()) {
      Toast.show({
        type: "info",
        text1: "Please enter your name.",
      });
      return;
    }

    if (!emailValidator(register.email)) {
      Toast.show({
        type: "info",
        text1: "Please enter a valid email address.",
      });
      return;
    }

    if (register.password.length < 8) {
      Toast.show({
        type: "info",
        text1: "Password must be at least 8 characters long.",
      });
      return;
    }

    await Axios.post(`/auth/register`, {
      name: register.user.name,
      email: register.email,
      password: register.password,
    })
      .then(async (res) => {
        if (res) {
          Toast.show({
            type: "success",
            text1: res.data,
          });
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } else {
          console.error("Invalid response:", res);
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
        } else {
          console.error("Invalid error response:", err);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View className="flex items-center justify-center h-full">
      <View className="flex items-center w-full max-w-[380px]">
        <Image
          source={{ uri: "https://i.imgur.com/48Tcblx.png" }}
          className="h-[300px] w-[300px]"
        />
        <View className="w-full space-y-3">
          <View>
            <Text className="font-[Poppins]">Name</Text>
            <TextInput
              onChangeText={(text) =>
                setRegister((prevState) => ({
                  ...prevState,
                  user: {
                    ...prevState.user,
                    name: text,
                  },
                }))
              }
              className="bg-gray-200 font-[Poppins] p-2 rounded-lg"
            />
          </View>
          <View>
            <Text className="font-[Poppins]">Email</Text>
            <TextInput
              onChangeText={(text) => setRegister({ ...register, email: text })}
              className="bg-gray-200 font-[Poppins] p-2 rounded-lg"
            />
          </View>
          <View>
            <Text className="font-[Poppins]">Password</Text>
            <View className="flex flex-row items-center bg-gray-200 p-2 rounded-lg">
              <TextInput
                onChangeText={(text) =>
                  setRegister({ ...register, password: text })
                }
                secureTextEntry={!showPassword}
                className="flex-1 bg-gray-200 font-[Poppins] rounded-lg"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text>
                  {showPassword ? (
                    <Feather name="eye-off" size={24} color="black" />
                  ) : (
                    <AntDesign name="eyeo" size={24} color="black" />
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text className="text-[14px] font-[Poppins] text-gray-500">
            Already have an account?
            <Link href="/login" className="text-[#007BFF]">
              {" "}
              Login
            </Link>
          </Text>
        </View>

        <Text
          onPress={handleSubmit}
          className="bg-[#329DFF] mt-5 text-[18px] text-white p-3 w-full text-center rounded-lg"
        >
          {isLoading ? "Registering...." : "Register"}
        </Text>
      </View>
    </View>
  );
};

export default register;

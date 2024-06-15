import { Link } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";

import Axios from "@/lib/Axios";
import { isNotAuthenticated } from "@/lib/useToken";

export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

const login = () => {
  const router = useRouter();

  useEffect(() => {
    isNotAuthenticated(router);
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!emailValidator(login.email)) {
      Toast.show({
        type: "info",
        text1: "Please enter a valid email address.",
      });
      return;
    }

    await Axios.post(`/auth/login`, {
      email: login.email,
      password: login.password,
    })
      .then(async (res) => {
        if (res) {
          await AsyncStorage.setItem("accessToken", res.data.accessToken);
          Toast.show({
            type: "success",
            text1: "Logged in",
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 3000);
        } else {
          console.error("Invalid response:", res);
          Toast.show({
            type: "error",
            text1: "Invalid response from server",
          });
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          console.error("Error:", err);
          Toast.show({
            type: "error",
            text1: err.response.data.message,
          });
        } else {
          console.error("Invalid error response:", err);
          Toast.show({
            type: "error",
            text1: "Invalid error response from server",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <View className="flex items-center  justify-center h-full">
      <View className="flex items-center w-full max-w-[380px]">
        <Image
          source={{ uri: "https://i.imgur.com/48Tcblx.png" }}
          className="h-[300px] w-[300px]"
        />
        <View className="w-full space-y-3">
          <View>
            <Text className="font-[Poppins]">Email</Text>
            <TextInput
              onChangeText={(text) => setLogin({ ...login, email: text })}
              className="bg-gray-200 font-[Poppins] p-2 rounded-lg"
            />
          </View>
          <View>
            <Text className="font-[Poppins]">Password</Text>
            <View className="flex flex-row items-center bg-gray-200 p-2 rounded-lg">
              <TextInput
                onChangeText={(text) => setLogin({ ...login, password: text })}
                secureTextEntry={!showPassword}
                className="flex-1 font-[Poppins] bg-gray-200 rounded-lg"
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
            Don't have an account yet?
            <Link href="/register" className="text-[#007BFF]">
              {" "}
              Register
            </Link>
          </Text>
        </View>

        <Text
          onPress={handleSubmit}
          className="bg-[#329DFF] mt-5 text-[18px] text-white p-3 w-full text-center rounded-lg"
        >
          {isLoading ? "Logging in..." : "Login"}
        </Text>
      </View>
    </View>
  );
};

export default login;

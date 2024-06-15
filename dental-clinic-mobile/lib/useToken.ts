import Axios from "./Axios";
import { AlertStatic } from "react-native";
import { ExpoRouter } from "expo-router/types/expo-router";

const useToken = async (
  setToken?: (value: React.SetStateAction<Token | null>) => void
) => {
  try {
    const response = await Axios.get("/api/session");
    if (setToken) {
      setToken(response.data);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isAuthenticated = async (
  router: ExpoRouter.Router,
  Alert: AlertStatic
) => {
  try {
    await useToken();
  } catch (error: any) {
    Alert.alert("Session Expired");
    router.push("/login");
  }
};

export const isNotAuthenticated = async (router: any) => {
  try {
    await useToken();
    router.push("/dashboard");
  } catch (error) {
    return;
  }
};

export default useToken;

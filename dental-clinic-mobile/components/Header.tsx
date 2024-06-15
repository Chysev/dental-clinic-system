import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Axios from "@/lib/Axios";

const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<Token | null>(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(
    new Animated.Value(-Dimensions.get("window").width)
  ).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const useToken = async () => {
    try {
      const response = await Axios.get<Token>(`/api/session`);
      setToken(response.data);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const logout = async () => {
    try {
      await Axios.get(`/auth/logout`);
      await AsyncStorage.clear();
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get("window").width,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  useEffect(() => {
    if (menuVisible) {
      openMenu();
    }
    useToken();
  }, [menuVisible]);

  return (
    <View>
      <View className="flex flex-row justify-between items-center px-5 py-4 bg-[whitesmoke]">
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu-outline" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: `${token?.user.avatarUrl}` }}
            className="h-[50px] w-[50px] rounded-full"
          ></Image>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      <Modal
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View className="flex-1">
            <TouchableWithoutFeedback>
              <Animated.View
                style={{
                  transform: [{ translateX: slideAnim }],
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "75%",
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  paddingVertical: 16,
                  paddingHorizontal: 12,
                }}
                className="gap-3"
              >
                <View className="flex flex-row items-center">
                  <Image
                    source={require("../assets/images/clinic_logo_2.png")}
                    className="h-[50px] w-[50px]"
                  />
                  <Text className="text-[28px] font-bold">Dental Clinic</Text>
                </View>
                <Link href="/dashboard">
                  <View className="flex flex-row items-center gap-2 space-x-3">
                    <MaterialCommunityIcons
                      name="view-dashboard"
                      size={30}
                      color="black"
                    />
                    <Text className="text-slate-800 text-lg">Dashboard</Text>
                  </View>
                </Link>
                <Link href="/calendar">
                  <View className="flex flex-row items-center gap-2 space-x-3">
                    <FontAwesome name="calendar" size={30} color="black" />
                    <Text className="text-slate-800 text-lg">Calendar</Text>
                  </View>
                </Link>
                <Link href="/appointments">
                  <View className="flex flex-row items-center gap-2 space-x-3">
                    <FontAwesome5 name="address-book" size={30} color="black" />
                    <Text className="text-slate-800 text-lg">Appointments</Text>
                  </View>
                </Link>
                <Link href="/book">
                  <View className="flex flex-row items-center gap-2 space-x-3">
                    <FontAwesome5 name="address-book" size={30} color="black" />
                    <Text className="text-slate-800 text-lg">Book</Text>
                  </View>
                </Link>

                <View
                  style={{ position: "absolute", bottom: 16, left: 1 }}
                  className="gap-3"
                >
                  <View className="flex flex-row items-center gap-2 space-x-3">
                    <Image
                      source={{ uri: `${token?.user.avatarUrl}` }}
                      className="h-[35px] w-[35px] rounded-full"
                    ></Image>
                    <Link href="/editprofile" className="text-lg mt-4">
                      <Text className="text-slate-800">{token?.user.name}</Text>
                    </Link>
                  </View>
                  <TouchableOpacity
                    className="flex flex-row items-center gap-2 space-x-4"
                    onPress={logout}
                  >
                    <SimpleLineIcons name="logout" size={30} color="black" />
                    <Text className="text-lg text-slate-800 mt-4">Logout</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Header;

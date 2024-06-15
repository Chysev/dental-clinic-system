import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Header from "@/components/Header";
import Axios from "@/lib/Axios";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>("No file chosen");

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
      setFileName(result.assets[0].uri.split("/").pop() || "No file chosen");
    }
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      const formData: any = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("contact", contact);
      formData.append("oldPassword", oldPassword);
      formData.append("newPassword", newPassword);

      if (image) {
        const uriParts = image.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append("avatarUrl", {
          uri: image,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await Axios.put(`/api/edit-own-account/:id`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", response.data.message || "Something went wrong!");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to update profile!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView
          className="flex px-5 w-screen space-y-8 mt-2"
          contentContainerStyle={{ alignItems: "center", paddingBottom: 90 }}
        >
          <View className="space-y-3 w-full">
            <Text className="text-xl font-[Poppins] font-bold">
              Personal Information
            </Text>
            <View className="space-y-3">
              <View>
                <Text>Name</Text>
                <TextInput
                  placeholder="First Middle Last"
                  className="bg-gray-200 p-2 rounded-lg"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View>
                <Text>Email</Text>
                <TextInput
                  placeholder="Email"
                  className="bg-gray-200 p-2 rounded-lg"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
              <View>
                <Text>Contact</Text>
                <TextInput
                  placeholder="+63 0000 000 0000"
                  className="bg-gray-200 p-2 rounded-lg"
                  value={contact}
                  onChangeText={setContact}
                />
              </View>
              <View>
                <Text>Upload Profile</Text>
                <View className="flex flex-row border-[0.3px] rounded-lg items-center space-x-2">
                  <TouchableOpacity
                    onPress={pickImage}
                    className="bg-[#111827] p-2 rounded-lg"
                  >
                    <Text className="text-white p-1 text-center">
                      Choose File
                    </Text>
                  </TouchableOpacity>
                  <Text>{fileName}</Text>
                </View>
                {image && (
                  <ImageBackground
                    source={{ uri: image }}
                    className="h-40 w-40 mt-3 rounded-lg overflow-hidden"
                  >
                    <View className="flex-1 justify-end items-center bg-black bg-opacity-50">
                      <Text className="text-white p-1">Profile Image</Text>
                    </View>
                  </ImageBackground>
                )}
              </View>
            </View>
          </View>

          <View className="space-y-3 w-full">
            <Text className="text-xl font-[Poppins] font-bold">
              Credentials
            </Text>

            <View>
              <Text>Old Password</Text>
              <TextInput
                className="bg-gray-200 p-2 rounded-lg"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
              />
            </View>
            <View>
              <Text>New Password</Text>
              <TextInput
                className="bg-gray-200 p-2 rounded-lg"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>
          </View>
          <TouchableOpacity onPress={handleSaveChanges}>
            <Text className="w-[35%] text-white rounded-lg text-center bg-cyan-600 p-3">
              Save Changes
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default EditProfile;

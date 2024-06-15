import { styled } from "nativewind";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, Text, Button, Alert } from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import Axios from "@/lib/Axios";
const StyledButton = styled(Button);
import Header from "@/components/Header";
import { isAuthenticated } from "@/lib/useToken";

const book: React.FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<Token | null>(null);
  const [form, setForm] = useState<Form>({
    userId: 0,
    dentistId: "",
    status: "SCHEDULE",
    serviceIds: [],
    date: new Date().toISOString(),
    time: "09:00 AM",
  });
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>("09:00 AM");

  const useToken = async () => {
    try {
      const response = await Axios.get<Token>(`/api/session`);
      setToken(response.data);
      setForm((prevForm) => ({ ...prevForm, userId: response.data.id }));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch token.");
    }
  };

  const GET_DENTISTS = async () => {
    try {
      const response = await Axios.get<Dentist[]>(`/api/user-list/dentists`);
      setDentists(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch dentists.");
    }
  };

  const GET_SERVICES = async () => {
    try {
      const response = await Axios.get<Service[]>(`/api/services`);
      setServices(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch services.");
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await isAuthenticated(router, Alert);
      await useToken();
      await GET_DENTISTS();
      await GET_SERVICES();
    };
    initialize();
  }, []);

  const handleInputChange = (name: keyof Form, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setForm({ ...form, date: selectedDate.toISOString() });
    }
  };

  const handleTimeChange = (itemValue: string) => {
    setSelectedTime(itemValue);
    setForm({ ...form, time: itemValue });
  };

  const toggleService = (serviceId: number) => {
    const isSelected = selectedServices.includes(serviceId);
    if (isSelected) {
      const updatedServices = selectedServices.filter((id) => id !== serviceId);
      setSelectedServices(updatedServices);
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  const createAppointment = async () => {
    try {
      const response = await Axios.post("/api/appointment/create", {
        ...form,
        serviceIds: selectedServices,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Appointment created successfully!");
        router.push("/dashboard");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create appointment.");
    }
  };

  return (
    <View>
      <Header />

      <View className="m-auto w-full space-y-10">
        <Text className="text-[24px] m-auto font-bold font-[Poppins]">
          Create Appointment
        </Text>
        <Text className="m-auto">Hi {token?.user.name}!</Text>
        <View className="space-y-3 p-2">
          <View>
            <Text className="font-[Poppins] font-bold">Select Dentist</Text>
            <Picker
              selectedValue={form.dentistId}
              onValueChange={(itemValue) =>
                handleInputChange("dentistId", itemValue)
              }
              className="font-[Poppins]"
            >
              <Picker.Item label="Select Dentist" value="" />
              {dentists.map((dentist) => (
                <Picker.Item
                  key={dentist.id}
                  label={dentist.user.name}
                  value={dentist.id.toString()}
                />
              ))}
            </Picker>
          </View>

          <View>
            {showDatePicker && (
              <DateTimePicker
                value={new Date(form.date)}
                mode="date"
                display="calendar"
                onChange={(event, date) => handleDateChange(event, date)}
              />
            )}

            <Text className="font-[Poppins] font-bold">Select Date</Text>
            <View className="px-4 py-3">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text className="text-[16px]">
                  {new Date(form.date).toLocaleDateString()}
                </Text>
                <AntDesign
                  onPress={() => setShowDatePicker(true)}
                  name="calendar"
                  size={24}
                  color="black"
                />
              </View>
            </View>
          </View>

          <View>
            <Text className="font-[Poppins] font-bold">Select Time</Text>
            <Picker
              selectedValue={selectedTime}
              onValueChange={(itemValue) => handleTimeChange(itemValue)}
              className="font-[Poppins]"
            >
              {[
                "09:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "01:00 PM",
                "02:00 PM",
                "03:00 PM",
                "04:00 PM",
                "05:00 PM",
              ].map((time) => (
                <Picker.Item key={time} label={time} value={time} />
              ))}
            </Picker>
          </View>

          <View>
            <Text className="font-[Poppins] font-bold">Select Services</Text>
            <Picker
              selectedValue={null}
              onValueChange={(itemValue) => {
                if (itemValue) {
                  toggleService(itemValue);
                }
              }}
              className="font-[Poppins]"
            >
              <Picker.Item label="Select Service" value={null} />
              {services.map((service) => (
                <Picker.Item
                  key={service.id}
                  label={service.name}
                  value={service.id}
                />
              ))}
            </Picker>

            <View className="mb-5 space-y-1">
              <Text className="font-[Poppins] font-bold">
                Selected Services:
              </Text>
              {selectedServices.map((serviceId) => {
                const service = services.find((s) => s.id === serviceId);
                if (!service) return null;
                return (
                  <View
                    key={service.id}
                    className="flex flex-row items-center gap-2"
                  >
                    <FontAwesome
                      key={service.id}
                      onPress={() => toggleService(service.id)}
                      name="remove"
                      size={24}
                      color="black"
                    />
                    <Text>{service.name}</Text>
                  </View>
                );
              })}
            </View>
          </View>
          <StyledButton title="Submit" onPress={createAppointment} />
        </View>
      </View>
    </View>
  );
};

export default book;

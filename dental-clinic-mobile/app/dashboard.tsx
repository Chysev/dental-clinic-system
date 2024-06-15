import { router } from "expo-router";
import { useEffect, useState } from "react";
import AweSomeAlert from "react-native-awesome-alerts";
import { View, Text, Image, StyleSheet, Alert, FlatList } from "react-native";

import Axios from "@/lib/Axios";
import Header from "@/components/Header";
import useToken, { isAuthenticated } from "@/lib/useToken";

type Token = {
  createdAt: string;
  email: string;
  exp: number;
  iat: number;
  id: number;
  updatedAt: string;
  user: User;
};

const Dashboard = () => {
  const [alertTitle, setAlertTitle] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [token, setToken] = useState<Token | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const GET_APPOINTMENTS = async () => {
    try {
      const response = await Axios.get<Appointment[]>(`/api/appointments`);
      setAppointments(response.data);
      if (response.data.length === 0) {
        setAlertTitle("Yehey");
        setAlertMessage("No appointments for today.");
        setShowAlert(true);
      }
    } catch (e) {
      setAlertTitle("Unable to load appointments");
      setAlertMessage("Please refresh or try again later");
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await GET_APPOINTMENTS();
    setRefreshing(false);
  };

  useEffect(() => {
    const Initialize = async () => {
      await isAuthenticated(router, Alert);
      await useToken(setToken);
      await GET_APPOINTMENTS();
    };
    Initialize();
  }, []);

  const filterAppointmentsForToday = () => {
    const today = new Date().toISOString().split("T")[0];
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.date.split("T")[0] === today
    );
    return filteredAppointments;
  };

  const todaysAppointments = filterAppointmentsForToday();

  return (
    <>
      <Header />
      <View
        className="flex items-center w-screen h-screen space-y-5"
        style={{ paddingBottom: 90 }}
      >
        <View
          className="flex p-4 space-y-5 rounded-xl max-w-[300px] w-full"
          style={styles.card}
        >
          <Image
            source={{ uri: `${token?.user.avatarUrl}` }}
            className="h-[160px] w-[160px] m-auto rounded-full"
          />
          <View className="gap-2">
            <Text>Name: {token?.user.name}</Text>
            <Text>Email: {token?.email}</Text>
            <Text>Role: {token?.user.role}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text className="font-semibold text-xl font-[Poppins]">
          Today's Appointments
        </Text>

        <FlatList
          data={todaysAppointments}
          className="max-w-[300px] w-full"
          renderItem={({ item }) => (
            <View>
              <View key={item.id} className="flex p-3 rounded-xl">
                <View className="gap-2 p-2 " style={styles.card}>
                  <Text className="font-[Poppins] text-[18px] font-bold">
                    {item.time}
                  </Text>
                  <Text className="font-[Poppins]">ID: {item.id}</Text>
                  <Text className="font-[Poppins]">Status: {item.status}</Text>
                  <Text className="font-[Poppins]">
                    Dentist: {item.dentist.name}
                  </Text>
                  <Text className="font-[Poppins]">Services:</Text>
                  {item.services.map((service) => (
                    <Text key={service.id} className="ml-2">
                      {service.name} - ${service.price}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={() => (
            <>
              <Text className="m-auto">No Appointment Today</Text>

              <AweSomeAlert
                show={showAlert}
                message={alertMessage}
                title={alertTitle}
                onConfirmPressed={() => setShowAlert(false)}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
              />
            </>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    width: "80%",
  },
});

export default Dashboard;

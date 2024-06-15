import { router } from "expo-router";
import { useEffect, useState } from "react";
import AweSomeAlert from "react-native-awesome-alerts";
import { View, Text, StyleSheet, Alert, FlatList } from "react-native";

import Axios from "@/lib/Axios";
import Header from "@/components/Header";
import useToken, { isAuthenticated } from "@/lib/useToken";

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
        setAlertMessage("You have no appointment");
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
    const initialize = async () => {
      await isAuthenticated(router, Alert);
      await useToken(setToken);
      await GET_APPOINTMENTS();
    };
    initialize();
  }, []);

  return (
    <>
      <Header />
      <View
        className="flex items-center w-screen h-screen space-y-5"
        style={{ paddingBottom: 90 }}
      >
        <Text className="font-semibold text-xl font-[Poppins]">
          Appointments
        </Text>
        <FlatList
          data={appointments}
          className="max-w-[300px] w-full"
          renderItem={({ item }) => (
            <>
              <View
                key={item.id}
                className="flex p-3 rounded-xl max-w-[300px] w-full"
              >
                <View className="gap-2 p-2" style={styles.card}>
                  <Text className="font-[Poppins] text-[18px] font-bold">
                    {new Date(item.date).toLocaleDateString()}, {item.time}
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

              {appointments && appointments.length === 0 && (
                <Text>You have no appointment {token?.user.name}!</Text>
              )}
            </>
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

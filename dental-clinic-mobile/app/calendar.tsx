import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Calendar } from "react-native-calendars";

import Axios from "@/lib/Axios";
import Header from "@/components/Header";
import { isAuthenticated } from "@/lib/useToken";

const CalendarScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const [appointments, setAppointments] = useState<AppointmentCalendar[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const Initialize = async () => {
      await isAuthenticated(router, Alert);
      await GET_APPOINTMENTS();
    };
    Initialize();
  }, []);

  const GET_APPOINTMENTS = async () => {
    try {
      const response = await Axios.get<AppointmentCalendar[]>(
        `/api/appointments`
      );
      if (response) {
        setAppointments(response.data);
        setLoading(false);
      }
    } catch (e) {
      setTimeout(() => {
        Alert.alert("Unable to load calendar", "Try again later");
      }, 5000);
    }
  };

  const transformDataToMarkedDates = (appointments: AppointmentCalendar[]) => {
    const markedDates: {
      [key: string]: { marked: boolean; dotColor: string };
    } = {};
    appointments.forEach((appointment) => {
      const date = new Date(appointment.date);
      const dateString = date.toLocaleDateString("en-CA");
      markedDates[dateString] = { marked: true, dotColor: "blue" };
    });
    return markedDates;
  };

  const markedDates = transformDataToMarkedDates(appointments);

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Calendar</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <Calendar
              markedDates={markedDates}
              onDayPress={(day: {
                dateString: React.SetStateAction<string>;
              }) => {
                console.log("selected day", day);
                setSelectedDate(day.dateString);
              }}
              className="gap-4"
            />
            <View style={styles.appointmentsContainer}>
              {appointments
                .filter(
                  (appointment) =>
                    new Date(appointment.date).toLocaleDateString("en-CA") ===
                    selectedDate
                )
                .map((appointment) => (
                  <View key={appointment.id} style={styles.appointment}>
                    <Image
                      source={{ uri: appointment.dentist.avatarUrl }}
                      style={styles.avatar}
                    />
                    <View style={styles.details}>
                      <Text style={styles.name}>
                        {appointment.dentist.name}
                      </Text>
                      <Text style={styles.service}>
                        {appointment.services[0].name}
                      </Text>
                      <Text style={styles.date}>
                        {new Date(appointment.date).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  appointmentsContainer: {
    marginTop: 20,
  },
  appointment: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  service: {
    fontSize: 14,
    color: "gray",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
});

export default CalendarScreen;

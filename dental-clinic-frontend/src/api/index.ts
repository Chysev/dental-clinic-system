import Axios from "@/lib/Axios";
import { ToastTypes } from "@/lib/useToast";
import { AppointmentT, AccountT } from "@/types";
import { SetStateAction } from "react";

// Fetch
const GET_APPOINTMENT = async (): Promise<AppointmentT[]> => {
  try {
    const response = await Axios.get("/api/appointments");
    return response.data;
  } catch (error) {
    console.error("Error getting appointment:", error);
    throw error;
  }
};

const GET_DENTISTS = async (): Promise<AccountT[]> => {
  try {
    const response = await Axios.get("/api/user-list/dentists");
    return response.data;
  } catch (error) {
    console.error("Error getting dentists:", error);
    throw error;
  }
};

const GET_PATIENTS = async (): Promise<AccountT[]> => {
  try {
    const response = await Axios.get("/api/user-list/patients");
    return response.data;
  } catch (error) {
    console.error("Error getting dentists:", error);
    throw error;
  }
};

const ARCHIVE_APPOINTMENT = async (id: number) => {
  try {
    const response = await Axios.post(`/api/appointments/${id}/archive`);
    return response.data;
  } catch (error) {
    console.error("Error archive:", error);
    throw error;
  }
};

const GET_STAFFS = async (): Promise<AccountT[]> => {
  try {
    const response = await Axios.get("/api/user-list/staffs");
    return response.data;
  } catch (error) {
    console.error("Error getting dentists:", error);
    throw error;
  }
};

const GET_SERVICES = async () => {
  try {
    const response = await Axios.get(`/api/services`);

    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

const GET_ALLUSERS = async (): Promise<AccountT[]> => {
  try {
    const response = await Axios.get("/api/user-list");
    return response.data;
  } catch (error) {
    console.error("Error getting dentists:", error);
    throw error;
  }
};

// Put
const PUT_ACCOUNT = async (
  Toast: (description: string, type?: ToastTypes) => void,
  setOpenModalEditProfile: (value: SetStateAction<boolean>) => void,
  id: number,
  datas: { name?: string; email?: string; contact?: string; role?: string }
) => {
  await Axios.put(`/api/edit-account/${id}`, datas)
    .then((res) => {
      if (res) {
        Toast(res.data.message, ToastTypes.SUCCESS);
        setOpenModalEditProfile(false);
      }
    })
    .catch((err) => {
      if (err) {
        Toast(err.response.data.message, ToastTypes.ERROR);
        setOpenModalEditProfile(false);
      } else {
        Toast("Invalid error response from server", ToastTypes.ERROR);
      }
    });
};

// Delete
const DELETE_APPOINTMENT = async (id: number) => {
  try {
    await Axios.delete(`/api/delete-appointment/${id}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

const DELETE_SERVICE = async (id: number) => {
  try {
    await Axios.delete(`/api/delete-service/${id}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

const DELETE_ACCOUNT = async (id: number) => {
  try {
    await Axios.delete(`/api/delete-account/${id}`);
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

export {
  GET_APPOINTMENT,
  DELETE_APPOINTMENT,
  GET_DENTISTS,
  GET_SERVICES,
  DELETE_SERVICE,
  GET_STAFFS,
  DELETE_ACCOUNT,
  PUT_ACCOUNT,
  GET_ALLUSERS,
  ARCHIVE_APPOINTMENT,
  GET_PATIENTS,
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import axiosInstance from "@/services/axiosInstance";
import { addToast } from "@heroui/toast";

interface Session {
  uid: string;
  user: string;
}

interface AuthSlice {
  loading: boolean;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const setSession = (session: Session | null) => {
  if (session) {
    localStorage.setItem("session", JSON.stringify(session));
  } else {
    localStorage.removeItem("session");
  }
};

export const useAuthStore = create<AuthSlice>((set) => ({
  loading: false,

  register: async (username, password) => {
    set({ loading: true });
    try {
      await axiosInstance.post("/api/auth", {
        action: "register",
        username,
        password,
      });
      addToast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada.",
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Registro fallido",
        description: error.response?.data?.error || "Error.",
        color: "danger",
      });
    } finally {
      set({ loading: false });
    }
  },

  login: async (username, password) => {
    set({ loading: true });
    try {
      const { data } = await axiosInstance.post("/api/auth", {
        action: "login",
        username,
        password,
      });
      setSession({ uid: data.id, user: username });
      addToast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${username}!`,
        color: "success",
      });
    } catch (error: any) {
      addToast({
        title: "Error de inicio de sesión",
        description: error.response?.data?.error || "Credenciales incorrectas.",
        color: "danger",
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axiosInstance.delete("/api/auth");
      setSession(null);
      document.cookie = "authToken=; Max-Age=0; path=/";
      addToast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente.",
        color: "primary",
      });
    } catch (error) {
      addToast({
        title: "Error al cerrar sesión",
        description: error as string,
        color: "danger",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

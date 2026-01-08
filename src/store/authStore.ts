import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";
const APP_SOURCE = "timetablely";

export interface User {
  id: string;
  email: string;
  username: string;
  firstname?: string;
  lastname?: string;
  avatar?: string;
  role?: string;
  plan?: string;
}

interface SignupData {
  email: string;
  password: string;
  username: string;
  firstname?: string;
  lastname?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  signup: (data: SignupData) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  initiateGoogleAuth: () => Promise<void>;
  handleGoogleCallback: (code: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await axios.post(`${API_BASE}/auth/signup`, {
            ...data,
            appSource: APP_SOURCE,
          });

          if (!res.success) {
            throw new Error(res.message || "Signup failed");
          }

          set({
            user: res.data.user,
            token: res.data.accessToken,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data?.message as string) || err.message
            : "Signup failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      signin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await axios.post(`${API_BASE}/auth/signin`, {
            email,
            password,
          });

          if (!res.success) {
            throw new Error(res.message || "Sign in failed");
          }

          set({
            user: res.data.user,
            token: res.data.accessToken,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data?.message as string) || err.message
            : "Sign in failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      initiateGoogleAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await axios.get(`${API_BASE}/auth/google`);

          if (!res.success) {
            throw new Error(res.message || "Failed to initiate Google auth");
          }

          window.location.href = res.data.authUrl;
        } catch (err: unknown) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data?.message as string) || err.message
            : "Google auth failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      handleGoogleCallback: async (code: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await axios.get(
            `${API_BASE}/auth/google/callback`,
            { params: { code, appSource: APP_SOURCE } }
          );

          if (!res.success) {
            throw new Error(res.message || "Google authentication failed");
          }

          set({
            user: res.data.user,
            token: res.data.accessToken,
            isLoading: false,
          });
        } catch (err: unknown) {
          const message = axios.isAxiosError(err)
            ? (err.response?.data?.message as string) || err.message
            : "Google auth failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "timetablely-auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);

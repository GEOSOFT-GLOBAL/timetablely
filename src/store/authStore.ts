import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { authApi } from "@/config/axios";

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
  registeredApps?: string[];
}

interface SignupData {
  email: string;
  password: string;
  username: string;
  firstname?: string;
  lastname?: string;
  linkAccount?: boolean;
}

export interface AccountLinkPrompt {
  existingApps: string[];
  prompt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  accountLinkPrompt: AccountLinkPrompt | null;
  signup: (data: SignupData) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  initiateGoogleAuth: () => Promise<void>;
  handleGoogleCallback: (code: string, state?: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  clearAccountLinkPrompt: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      accountLinkPrompt: null,

      signup: async (data: SignupData) => {
        set({ isLoading: true, error: null, accountLinkPrompt: null });
        try {
          const { data: res } = await authApi.post(
            "/signup",
            {
              ...data,
              appSource: APP_SOURCE,
            },
            {
              timeout: 10000, // 10 second timeout
            }
          );

          if (!res.success) {
            throw new Error(res.message || "Signup failed");
          }

          set({
            user: res.data.user,
            token: res.data.accessToken,
            isLoading: false,
          });
        } catch (err: unknown) {
          if (err instanceof AxiosError) {
            const errorData = err.response?.data;

            // Check for account linking prompt
            if (errorData?.code === "ACCOUNT_EXISTS_LINK_PROMPT") {
              set({
                isLoading: false,
                accountLinkPrompt: {
                  existingApps: errorData.errorData?.existingApps || [],
                  prompt:
                    errorData.errorData?.prompt ||
                    "Account exists. Link accounts?",
                },
              });
              throw new Error("ACCOUNT_LINK_REQUIRED");
            }

            let message = "Signup failed";
            if (err.code === "ECONNABORTED" || err.code === "ERR_NETWORK") {
              message =
                "Network error. Please check your connection and try again.";
            } else if (errorData?.message) {
              message = errorData.message;
            } else if (err.message) {
              message = err.message;
            }

            set({ error: message, isLoading: false });
            throw new Error(message);
          }
          set({ error: "Signup failed", isLoading: false });
          throw new Error("Signup failed");
        }
      },

      signin: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          console.log("Attempting signin to: /auth/signin");

          const { data: res } = await authApi.post(
            "/signin",
            {
              email,
              password,
            },
            {
              timeout: 30000, // 30 second timeout for cold starts
            }
          );

          console.log("Signin response:", res);

          if (!res.success) {
            throw new Error(res.message || "Sign in failed");
          }

          set({
            user: res.data.user,
            token: res.data.accessToken,
            isLoading: false,
          });

          sessionStorage.setItem("token", res?.data?.accessToken);
        } catch (err: unknown) {
          console.error("Signin error:", err);
          let message = "Sign in failed";

          if (err instanceof AxiosError) {
            if (err.code === "ECONNABORTED") {
              message =
                "Request timeout. The server might be starting up. Please try again in a moment.";
            } else if (err.code === "ERR_NETWORK") {
              message = "Network error. Please check your internet connection.";
            } else if (err.response?.data?.message) {
              message = err.response.data.message;
            } else if (err.message) {
              message = err.message;
            }
          }

          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      initiateGoogleAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data: res } = await authApi.get(`/google?appSource=${APP_SOURCE}`);

          if (!res.success) {
            throw new Error(res.message || "Failed to initiate Google auth");
          }

          // Store state in session storage for CSRF protection
          if (res.data.state) {
            sessionStorage.setItem('oauth_state', res.data.state);
          }

          window.location.href = res.data.authUrl;
        } catch (err: unknown) {
          const message = err instanceof AxiosError
            ? (err.response?.data?.message as string) || err.message
            : "Google auth failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      handleGoogleCallback: async (code: string, state?: string) => {
        set({ isLoading: true, error: null });
        try {
          // Validate state parameter for CSRF protection
          const storedState = sessionStorage.getItem('oauth_state');
          if (state && storedState && state !== storedState) {
            throw new Error("Invalid state parameter. Possible CSRF attack.");
          }

          // Clear stored state after validation
          sessionStorage.removeItem('oauth_state');

          const { data: res } = await authApi.get(
            "/google/callback",
            { params: { code, appSource: APP_SOURCE, state } }
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
          const message = err instanceof AxiosError
            ? (err.response?.data?.message as string) || err.message
            : "Google auth failed";
          set({ error: message, isLoading: false });
          throw new Error(message);
        }
      },

      logout: () => {
        set({ user: null, token: null, error: null, accountLinkPrompt: null });
      },

      clearError: () => {
        set({ error: null });
      },

      clearAccountLinkPrompt: () => {
        set({ accountLinkPrompt: null });
      },
    }),
    {
      name: "timetablely-auth",
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);

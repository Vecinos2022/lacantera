"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Tabs,
  Tab,
} from "@heroui/react";
import { useAuthStore } from "@/store/authSlice";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();
  const { login, register: registerUser, loading } = useAuthStore();

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<{ username: string; password: string }>();

  // Register form
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch,
  } = useForm<{
    username: string;
    password: string;
    confirmPassword: string;
  }>();

  const onLoginSubmit = async (data: {
    username: string;
    password: string;
  }) => {
    try {
      await login(data.username, data.password);
      router.push("/admin");
    } catch (error) {
      // Error is handled in the auth slice
      console.error("Login failed", error);
    }
  };

  const onRegisterSubmit = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      await registerUser(data.username, data.password);
      // After successful registration, switch to login tab
      setActiveTab("login");
    } catch (error) {
      // Error is handled in the auth slice
      console.error("Registration failed", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{ backgroundImage: "url('/LaCantera.png')" }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      <Card className="relative z-10 w-full max-w-md shadow-lg p-4">
        <CardHeader className="flex justify-center pb-0">
          <h1 className="text-2xl font-bold text-foreground">Wedding Admin</h1>
        </CardHeader>
        <CardBody>
          <Tabs
            fullWidth
            aria-label="Authentication options"
            variant="bordered"
            color="warning"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key.toString())}
            className="mb-4"
          >
            <Tab key="login" title="Iniciar sesión">
              <form
                onSubmit={handleLoginSubmit(onLoginSubmit)}
                className="grid grid-cols-1 gap-4"
              >
                <Input
                  label="Usuario"
                  variant="bordered"
                  color="warning"
                  isDisabled={loading}
                  {...registerLogin("username", {
                    required: "Username is required",
                  })}
                  errorMessage={loginErrors.username?.message}
                  isInvalid={!!loginErrors.username}
                />
                <Input
                  label="Password"
                  type="Contraseña"
                  variant="bordered"
                  color="warning"
                  isDisabled={loading}
                  {...registerLogin("password", {
                    required: "Password is required",
                  })}
                  errorMessage={loginErrors.password?.message}
                  isInvalid={!!loginErrors.password}
                />
                <Button
                  type="submit"
                  color="warning"
                  variant="solid"
                  className="w-full"
                  isLoading={loading}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Tab>

            <Tab key="register" title="Registro">
              <form
                onSubmit={handleSignupSubmit(onRegisterSubmit)}
                className="grid grid-cols-1 gap-4"
              >
                <Input
                  label="Usuario"
                  variant="bordered"
                  color="warning"
                  isDisabled={loading}
                  {...registerSignup("username", {
                    required: "Username is required",
                  })}
                  errorMessage={signupErrors.username?.message}
                  isInvalid={!!signupErrors.username}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  variant="bordered"
                  color="warning"
                  isDisabled={loading}
                  {...registerSignup("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  errorMessage={signupErrors.password?.message}
                  isInvalid={!!signupErrors.password}
                />
                <Input
                  label="Confirmar contraseña"
                  type="password"
                  variant="bordered"
                  color="warning"
                  isDisabled={loading}
                  {...registerSignup("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords don't match",
                  })}
                  errorMessage={signupErrors.confirmPassword?.message}
                  isInvalid={!!signupErrors.confirmPassword}
                />
                <Button
                  type="submit"
                  color="warning"
                  variant="solid"
                  className="w-full"
                  isLoading={loading}
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Register"}
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

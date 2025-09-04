import Ionicons from "@expo/vector-icons/build/Ionicons";
import { Button, Spinner, TextField, useTheme } from "heroui-native";
import { useState } from "react";
import { Alert } from "react-native";
import FormHeader, { FormContainer } from "@/components/ui/form";
import { authClient } from "@/lib/better-auth/auth-client";
/**
 * RequestPasswordResetRouteadd redirect to link!!!
 */
if (!process.env.EXPO_PUBLIC_MOBILE_URL) {
  throw new Error("EXPO_PUBLIC_MOBILE_URL is not defined");
}
export default function RequestPasswordResetRoute() {
  const { colors } = useTheme();
  /* ---------------------------------- state --------------------------------- */
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /* ------------------------ handle request reset --------------------------- */
  const handleRequestReset = async () => {
    /**
     * FEAT: Add your own form validation validation here
     * i've been using tanstack form for react native with zod
     *
     * but this is just a base for you to get started
     */
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    const { error, data } = await authClient.requestPasswordReset(
      {
        email: email,
        /**
         * "/--/" is for expo go
         * "myschema://" for dev builds
         *
         * make sure if you make a dev build to change the route
         *
         * https://docs.expo.dev/versions/latest/sdk/linking/#linkingcreateurlpath-namedparameters
         */
        redirectTo: `${process.env.EXPO_PUBLIC_MOBILE_URL}/email/reset-password`, // use metro link
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },

        onError: (ctx) => {
          Alert.alert("Error", ctx.error.message || "Failed to sign up");
        },
        onSuccess: () => {
          console.log("success!");
        },
        onComplete: () => {
          setIsLoading(false);
        },
      },
    );
    console.log(data, error);
  };
  /* --------------------------------- return --------------------------------- */
  return (
    <FormContainer>
      {/* header */}
      <FormHeader
        title="Reset Password"
        description="Enter your email to receive a password reset link"
      />
      {/* email */}
      <TextField isRequired>
        <TextField.Input
          className="rounded-3xl"
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        >
          <TextField.InputStartContent className="pointer-events-none">
            <Ionicons
              name="mail-outline"
              size={16}
              color={colors.mutedForeground}
            />
          </TextField.InputStartContent>
        </TextField.Input>
      </TextField>
      {/* submit button */}
      <Button
        onPress={handleRequestReset}
        disabled={isLoading}
        className="rounded-3xl"
      >
        <Button.Label>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </Button.Label>
        <Button.EndContent>
          {isLoading ? <Spinner color={colors.background} /> : null}
        </Button.EndContent>
      </Button>
    </FormContainer>
  );
}

import { useState } from "react";
import { authClient } from "../client";

export const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        // On native, the Expo client plugin converts this path to a deep link.
        // Use the same destination as Apple for consistency.
      });
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
  };
};

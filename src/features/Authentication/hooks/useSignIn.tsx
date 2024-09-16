import { useState } from "react";
import { useAuthContext } from "~src/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("userInfo", JSON.stringify(response));
      if (response) {
        dispatch({ type: "LOGIN", payload: response });
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, signIn };
};

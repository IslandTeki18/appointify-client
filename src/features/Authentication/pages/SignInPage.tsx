import * as React from "react";
import { useState, useEffect } from "react";
import { Input, Form, Button } from "~src/components";
import { useSignIn } from "../hooks";
import { useAuthContext } from "~src/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export const SignInPage = () => {
  const navigate = useNavigate();
  const { error, isLoading, signIn } = useSignIn();
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(email, password);
  }
  return (
    <div className="min-h-[65vh] flex justify-center items-center">
      <Form
        darkMode
        variant="primary"
        className="flex flex-col gap-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <Input
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div className="text-red-500">{error}</div>}
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || !email || !password}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </Form>
    </div>
  );
};

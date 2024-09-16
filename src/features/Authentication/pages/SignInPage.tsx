import * as React from "react";
import { useState } from "react";
import { Input, Form } from "~src/components";

export const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div className="min-h-[65vh] flex justify-center items-center">
      <Form
        darkMode
        variant="primary"
        className="flex flex-col gap-6 w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Sign In</h1>
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
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Sign In
        </button>
      </Form>
    </div>
  );
};
